const express = require('express')
const bodyParser = require('body-parser')
const Model = require('./model')
const Controller = require('./controller')
const Monitor = require('./monitor')
const Middleware = require('./middleware')
const Mail = require('./mail')
const Session = require('./session')
const AccessControl = require('./accessControl')

class Microservice {
  constructor(config) {
    this.config = config
    this.monitor = new Monitor(this)
    this.accessControl = new AccessControl(this)
    this.session = new Session(this)
    this.model = new Model(this)
    this.controller = new Controller(this)
    this.middleware = new Middleware(this)
    this.mail = new Mail(this)
  }

  report = () => {
    let report = ''

    report += this.controller.reportServices()
    report += '\nMonitor      \t' + this.monitor.report()
    report += '\nAccessControl\t' + this.accessControl.report()
    report += '\nMail         \t' + this.mail.report()
    report += '\nSession      \t' + this.session.report()
    report += '\nMiddleware   \t' + this.middleware.report()
    report += '\nModel        \t' + this.model.report()
    report += '\nController   \t' + this.controller.report()

    console.log(report)
    return this
  }

  start = async () => {
    try {
      await Promise.all([this.monitor.init(), this.model.init()])

      const app = express()

      app.use(this.accessControl.handler)

      app.use(bodyParser.json(this.config.get('bodyParser.json')))

      this.middleware.handlers.forEach((mw) => app.use(mw))

      app.use(this.session.handler)

      app.use(this.monitor.handler)

      this.controller.init(app)

      const host = this.config.get('host')
      const port = this.config.get('port')
      const name = this.config.get('name')
      const date = new Date().toLocaleDateString()

      app.listen(port, host, () => {
        this.monitor.log('Server ready', 'Start up', {
          name,
          date
        })

        console.log(`Server       \t🚀 - READY ${name} at ${host}:${port}`)
      })
    } catch (e) {
      console.error(`Server       \t💥 - Crashed \t${e.message}`)
      console.log(e)
      process.exit(1)
    }
  }
}

module.exports = Microservice
