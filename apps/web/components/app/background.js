import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export default styled(Box)(({ theme }) => ({
  background: 'url(/images/background.jpg)',
  width: '100%',
  height: '100vh',
  backgroundSize: 'cover'
}))
