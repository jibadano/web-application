import { createTheme } from '@mui/material/styles'
import config from 'config/get'

export default createTheme(config.get('settings.theme'))
