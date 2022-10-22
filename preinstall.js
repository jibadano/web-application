require('dotenv').config({ path: './.env' })
const { exec } = require('child_process')

if (process.env.NODE_ENV != 'development') {
  if (process.env.WORKSPACE) {
    if (process.env.WORKSPACE.startsWith('services')) {
      console.log('removing packages and apps')
      exec('rm -rf apps packages', (err) => {
        process.exit(err ? 1 : 0)
      })
    }
  } else {
    console.log('removing all')

    exec('rm -rf apps packages services', (err) => {
      process.exit(err ? 1 : 0)
    })
  }
}
