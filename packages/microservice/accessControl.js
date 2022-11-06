module.exports = class AccessControl {
  constructor({ config }) {
    this.config = config.get('accessControl')

    if (!this.config || !this.config.whiteList || !this.config.whiteList.length)
      this.handler = (_, __, next) => next()
  }

  report = () =>
    this.config
      ? `✅ - whitelisted ip's: ${this.config.whiteList.toString()}`
      : '❎ - Not configured, allow all'

  handler = (req, _, next) => {
    const ip = req.connection.localAddress
    const whitelisted = this.config.whiteList.indexOf(ip) > -1
    return next(whitelisted ? null : 'Access denied')
  }
}
