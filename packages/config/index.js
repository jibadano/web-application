const lodashGet = require('lodash/get')
const config = process.env.CONFIG ? JSON.parse(process.env.CONFIG) : {}

const get = (field = '') =>
  field.startsWith('..')
    ? lodashGet(config, field.replace('..', ''))
    : lodashGet(config, `current.${field}`)

module.exports = { get }
