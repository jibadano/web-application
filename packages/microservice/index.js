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

  start = async () => {
    await this.monitor.init()
    await this.model.init()

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
      console.log(`🚀 ${name} Server READY at ${host}:${port} `)
    })
  }
}

module.exports = Microservice
