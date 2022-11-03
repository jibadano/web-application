const mongoose = require('mongoose')
const moment = require('moment')
const { v1: uuidv1 } = require('uuid')
const TraceSchema = require('./trace')

module.exports = class Monitor {
  static MODES = {
    OFF: 'off',
    CONSOLE: 'console',
    DB: 'db'
  }

  constructor({ config }) {
    this.config = config.get('monitor') || { mode: Monitor.MODES.OFF }
    if (this.config.mode == Monitor.MODES.DB && !this.config.mongo) {
      console.warn(
        'Monitor mode is set to DB but no mongo path provided, monitor config fallback to OFF'
      )
      this.config = { mode: Monitor.MODES.OFF }
    }

    this.config.moduleName = config.get('name')
  }

  init = async () => {
    if (this.config.mode == Monitor.MODES.DB) {
      const monitorConnection = await mongoose.createConnection(
        this.config.mongo,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )

      this.Trace = monitorConnection.model('Trace', TraceSchema)

      if (this.config.exp) {
        let amount = this.config.exp
        let unit = 'milliseconds'
        if (this.config.exp.amount) amount = this.config.exp.amount
        if (this.config.exp.unit) unit = this.config.exp.unit

        await this.Trace.deleteMany({
          date: {
            $lte: moment().subtract(parseInt(amount), unit).toDate()
          }
        }).exec()
      }
    }
  }

  log = (message, trace, data, type = 'info') => {
    if (this.config.mode === Monitor.MODES.OFF)
      return typeof trace == 'object' ? trace : { operation: trace }

    let logData = typeof data == 'object' ? JSON.stringify(data) : data
    logData = logData && logData.indexOf('\n') > 0 ? '\n' + logData : logData

    if (logData && logData.length > Math.pow(2, 20))
      data = logData.substring(0, Math.pow(2, 20))

    if (typeof trace == 'object' && trace._id) {
      //Is an update
      if (this.Trace)
        this.Trace.updateOne(
          { _id: trace._id },
          { $push: { logs: { message, data, type } } }
        )
          .exec()
          .then((result) => {
            if (!result.modifiedCount) {
              setTimeout(() => {
                this.Trace.updateOne(
                  { _id: trace._id },
                  { $push: { logs: { message, data, type } } }
                ).exec()
              }, 1000)
            }
          })
      else console.log('>', Date.now(), trace._id, message, data)

      return
    }

    //New log

    if (typeof trace != 'object') {
      //Is an in line log
      trace = {
        operation: trace
      }
    }

    trace._id = uuidv1()
    trace.date = Date.now()
    trace.module = trace.module || this.config.moduleName
    trace.environment = process.env.NODE_ENV
    trace.logs = [
      {
        message,
        data,
        type
      }
    ]

    if (this.Trace) {
      new this.Trace(trace).save()
    } else {
      console.info(
        '>>>',
        trace.date,
        trace._id,
        trace.operation,
        trace.user,
        trace.ip,
        trace.module,
        trace.environment
      )
      console[type]('>', Date.now(), trace._id, message, data)
    }

    return trace
  }

  handler = (req, res, next) => {
    if (req.method == 'OPTIONS') return next()

    if (req.body && req.body.operationName == 'IntrospectionQuery')
      return next()

    /*     const moduleName =
      this.controller.moduleMap[
        req.body.operationName || req.url.replace('/', '')
      ]

    if (!moduleName) return next() */

    const trace = this.log(
      'Request',
      {
        operation: req.body.operationName,
        user: req.user && req.user.user && req.user.user._id,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
      },
      req.body.query
    )

    req.trace = trace
    req.log = (message, body, type) => {
      this.log(message, trace, body, type)
    }
    next()
  }
}
