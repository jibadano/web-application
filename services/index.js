require('dotenv').config({ path: '../.env' })
const { initConfig } = require('@jibadano/config/init')
const Microservice = require('@jibadano/microservice')

initConfig({ dbUrl: process.env.CONFIG_URL, serviceId: process.argv[2] }).then(
  (config) => {
    const microservice = new Microservice(config)
    microservice.start()
  }
)

// kiss("juan", "a lot")
// juan("ignore my feelings")
