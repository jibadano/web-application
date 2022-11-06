const nodemailer = require('nodemailer')
const fetch = require('node-fetch')
const URLSearchParams = require('url').URLSearchParams

module.exports = class Mail {
  constructor({ config }) {
    const mailConfig = config.get('mail')
    if (!mailConfig || !mailConfig.user || !mailConfig.pass) {
      this.send = () => console.error(`📧Mail  ERROR Not implemented`)
      this.sendPlain = () => console.error(`📧Mail  ERROR Not implemented`)
      if (mailConfig)
        console.warn(
          'Mail user or pass not provided, mail service will be unavailable'
        )
      return
    }

    this.from = {
      name: mailConfig.from || config.get('name'),
      address: mailConfig.user
    }

    this.baseUrl == config.get('..apps.web.url')

    const transportConfig = mailConfig.service || {
      service: 'gmail'
    }

    this.transport = nodemailer.createTransport({
      ...transportConfig,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass
      }
    })
  }

  report = () => (this.transport ? `✅ - ${this.from.address}` : '❎')

  send = (to, template, data = {}) => {
    return new Promise((resolve, reject) => {
      if (!to || !template)
        return reject(new Error("Mail 'to' or 'template' not provided"))

      fetch(
        this.baseUrl +
          '?' +
          new URLSearchParams({ vr: 'email', template, ...data }),
        { method: 'get' }
      )
        .then((res) => res.text())
        .then((body) => {
          let subjectTag = body.match(/SUBJECT_.*_SUBJECT/)
          subjectTag = subjectTag && subjectTag[0]

          if (!subjectTag) return reject(new Error('Subject not found'))

          const subject = subjectTag
            .replace('SUBJECT_', '')
            .replace('_SUBJECT', '')

          const start = body.indexOf('BODY_')
          const end = body.indexOf('_BODY')
          if (start == -1 || end == -1)
            return reject(new Error('Body not found'))

          let html = body.slice(start + 5, end)

          this.transport
            .sendMail({
              from: this.from,
              to,
              subject,
              html
            })
            .then(() => resolve())
        })
    })
  }

  sendPlain = (to, subject, text) => {
    if (!to || !text)
      throw new Error(`Mail error: Neither 'to' nor 'text' were provided`)

    return this.transport.sendMail({
      from: this.from,
      to,
      subject,
      text
    })
  }
}
