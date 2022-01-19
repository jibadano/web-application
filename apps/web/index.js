const pjson = require('./package.json')

const init = require('lib')
console.log(init, pjson.name)
init(pjson.name)
