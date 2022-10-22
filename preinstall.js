require('dotenv').config({ path: './.env' })
const { exec } = require('child_process')

if (process.env.NODE_ENV === 'production') {
  if (process.env.WORKSPACE) {
    if (process.env.WORKSPACE.startsWith('services')) {
      exec('rm -rf apps packages', (err) => {
        process.exit(err ? 1 : 0)
      })
    }
  } else {
    exec('rm -rf apps packages services', (err) => {
      process.exit(err ? 1 : 0)
    })
  }
}
