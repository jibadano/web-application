const lodashGet = require('lodash/get')

module.exports = class Config {
  constructor(data) {
    this.data = data
  }

  get(field = '') {
    return lodashGet(
      this.data,
      field.startsWith('..') ? field.replace('..', '') : `current.${field}`
    )
  }
}
