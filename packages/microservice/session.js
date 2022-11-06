const jwt = require('express-jwt')
const jsonwebtoken = require('jsonwebtoken')

module.exports = class Session {
  constructor({ config }) {
    this.jwtOptions = config.get('jwt.options')
    this.jwtSignOptions = config.get('jwt.signOptions')

    if (!this.jwtOptions) {
      this.sign = () => {}
      this.verify = () => {}
      this.handler = (_, __, next) => next()
    }
  }

  report = () => (this.jwtOptions ? '✅ - Configured' : '❎ - Not configured')

  sign = (data, signOptions) => {
    return jsonwebtoken.sign(
      data,
      this.jwtOptions.secret,
      signOptions || this.jwtSignOptions
    )
  }

  verify = (token) => {
    return jsonwebtoken.verify(token, this.jwtOptions.secret)
  }

  handler = (req, res, next) => {
    jwt(this.jwtOptions)(req, res, () => next())
  }
}
