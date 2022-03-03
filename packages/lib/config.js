import * as lodashGet from 'lodash/get'
import getConfig from 'next/config'
import pjson from 'package.json'

const config = getConfig().publicRuntimeConfig.config

export default {
  get: (field) => lodashGet(config, field),
  getServices: () => lodashGet(config, `${pjson.name}.services`)
}
