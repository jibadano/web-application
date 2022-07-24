require('dotenv').config({ path: '../.env' })

const Microservice = require('@jibadano/microservice')
let ms = new Microservice()
ms.init()

module.exports = ms
// kiss("juan", "a lot")
// juan("ignore my feelings")
