import React from 'react'
import Index from '../../../../web/pages/index'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Loading from '@backoffice/components/app/loading'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import Color from 'form/color'
import Slider from 'form/slider'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Actions from '@backoffice/components/app/actions'
import MobileIcon from '@mui/icons-material/PhoneIphone'
import DesktopIcon from '@mui/icons-material/Laptop'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Switch from '@mui/material/Switch'

import {
  useSettings,
  useUpdateSettings
} from '@backoffice/components/app/settings/hooks'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2
  }
}))

const SettingsTheme = () => {
  const [edit, setEdit] = React.useState()
  const [view, setView] = React.useState('desktop')
  const [darkMode, setDarkMode] = React.useState()
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const [updateSettings] = useUpdateSettings()

  const { settings, loading } = useSettings()
  const formik = useFormik({
    initialValues: settings,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({}),
    onSubmit: (settings) => {
      updateSettings({ variables: { settings } })
    }
  })
  if (loading || !settings || !settings.theme) return <Loading />
  formik.disabled = !edit

  return (
    <>
      <Grid container>
        <Grid item md={4} xs={12}>
          <Box sx={{ display: 'grid', gap: 3, m: 2, mt: 12 }}>
            <Color id="theme.palette.primary.main" {...formik}>
              Primary
            </Color>
            <Color id="theme.palette.secondary.main" {...formik}>
              Secondary
            </Color>
            <Slider id="theme.shape.borderRadius" min={0} max={360} {...formik}>
              Border
            </Slider>
            <Color id="theme.palette.text.primary" {...formik}>
              Primary text
            </Color>
            <Color id="theme.palette.text.secondary" {...formik}>
              Secondary text
            </Color>
            <Slider id="theme.typography.fontSize" {...formik}>
              Font size
            </Slider>
            <Box sx={{ py: 2 }}>
              <Actions
                left={[
                  {
                    children: 'Edit',
                    onClick: () => setEdit(true),
                    color: 'primary',
                    display: !edit
                  },
                  {
                    children: 'Cancel',
                    onClick: () => {
                      formik.setValues(settings)
                      setEdit()
                    },
                    color: 'inherit',
                    display: !!edit
                  }
                ]}
                right={[
                  {
                    display: !!edit,
                    children: 'Save',
                    onClick: formik.handleSubmit,
                    variant: 'contained',
                    color: 'primary',
                    disabled: !formik.dirty
                  }
                ]}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={8} sm={12}>
          <Box display="flex" justifyContent="center">
            {!mobile && (
              <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(e, view) => setView(view)}
                aria-label="View"
              >
                <ToggleButton value="desktop" aria-label="Desktop">
                  <DesktopIcon />
                </ToggleButton>
                <ToggleButton value="mobile" aria-label="Mobile">
                  <MobileIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            )}
            <MaterialUISwitch
              sx={{ m: 1 }}
              value={darkMode}
              onChange={(e, darkMode) => setDarkMode(darkMode)}
            />
          </Box>
          <Box>
            {formik.values.theme && (
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
                  transform: { md: 'scale(0.65) translateY(-20%)' }
                }}
              >
                <ThemeProvider
                  theme={(() => {
                    const theme = createTheme(formik.values.theme)
                    if (view == 'mobile') theme.breakpoints.keys = ['xs']
                    theme.palette.mode = darkMode ? 'dark' : 'light'

                    return theme
                  })()}
                >
                  <Index />
                </ThemeProvider>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default SettingsTheme
