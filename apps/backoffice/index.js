const pjson = require('./package.json')

const init = require('config/init')
console.log(init, pjson.name)
init(pjson.name)
