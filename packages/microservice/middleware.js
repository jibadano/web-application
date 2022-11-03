const fs = require('fs')
const path = require('path')

module.exports = class Middleware {
  constructor({ config }) {
    const middlewarePaths = config.get('selectedServices')

    this.handlers = []
    this.middlewares = []
    try {
      middlewarePaths.forEach((middlewarePath) => {
        const middlewareDir = './' + middlewarePath + '/middleware'
        fs.readdirSync(middlewareDir).forEach((middlewareFile) => {
          if (middlewareFile !== 'index.js') {
            const middleware = require(path.resolve(
              `${middlewareDir}/${middlewareFile}`
            ))

            if (middleware instanceof Array)
              this.handlers = this.handlers.concat(middleware)
            else if (middleware) this.handlers.push(middleware)

            if (middleware)
              this.middlewares.push(middlewareFile.replace('.js', ''))
          }
        })
      })
    } catch (e) {}
  }
}
