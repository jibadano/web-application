module.exports = class AccessControl {
  constructor({ config }) {
    this.config = config.get('accessControl')

    if (!this.config || !this.config.whiteList || !this.config.whiteList.length)
      this.handler = (_, __, next) => next()
  }

  handler = (req, res, next) => {
    const ip = req.connection.localAddress
    const whitelisted = this.config.whiteList.indexOf(ip) > -1
    return next(whitelisted ? null : 'Access denied')
  }
}
