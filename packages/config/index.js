const Config = require('./Config')

module.exports = new Config(
  process.env.CONFIG ? JSON.parse(process.env.CONFIG) : {}
)
