require('dotenv').config({ path: '../.env' })
const { initConfig } = require('@jibadano/config/init')
const Microservice = require('@jibadano/microservice')

initConfig({ dbUrl: process.env.CONFIG_URL, serviceId: process.argv[2] }).then(
  (config) => new Microservice(config).report().start()
)

// kiss("juan", "a lot")
// juan("ignore my feelings")
