import React from 'react'
import Index from '@web/pages/index'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Loading from '@backoffice/components/common/loading'
import useMediaQuery from '@mui/material/useMediaQuery'

import Box from '@mui/material/Box'
import View from './view'
import Mode from './mode'

const ThemePreview = ({ themeSettings }) => {
  const [view, setView] = React.useState('desktop')
  const [darkMode, setDarkMode] = React.useState()
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <>
      <Box
        sx={{
          mb: 2,
          gap: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {!mobile && <View onChange={setView} view={view} />}
        <Mode
          value={darkMode}
          onChange={(_, darkMode) => setDarkMode(darkMode)}
        />
      </Box>
      <Box>
        {themeSettings && (
          <Box
            sx={{
              border: mobile ? 'none' : '15px solid #ccc',
              borderColor: view == 'desktop' ? '#ccc' : '#222',
              borderRadius: mobile
                ? 0
                : view == 'desktop'
                ? '30px 30px 0 0'
                : 2,
              height: '100vh',
              overflow: 'scroll',
              mx: mobile ? -2 : view == 'desktop' ? -20 : 12,
              transition: '0.1s margin',
              transform: { md: 'scale(0.65) translateY(-25%)' }
            }}
          >
            {!themeSettings ? (
              <Loading />
            ) : (
              <ThemeProvider
                theme={(() => {
                  const theme = createTheme(themeSettings)
                  if (view == 'mobile') theme.breakpoints.keys = ['xs']
                  theme.palette.mode = darkMode ? 'dark' : 'light'

                  return theme
                })()}
              >
                <Index />
              </ThemeProvider>
            )}
          </Box>
        )}
      </Box>
    </>
  )
}

export default ThemePreview
