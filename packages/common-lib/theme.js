import { createTheme } from '@mui/material/styles'
import config from './config'

export default createTheme(config.get('settings.theme'))
