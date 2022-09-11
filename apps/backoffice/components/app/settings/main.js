import React, { useEffect } from 'react'

import Loading from '@backoffice/components/app/loading'

import TextField from 'form/textField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Actions from '@backoffice/components/app/actions'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  useSettings,
  useUpdateSettings
} from '@backoffice/components/app/settings/hooks'

const SettingsMain = () => {
  const [updateSettings] = useUpdateSettings()

  const formik = useFormik({
    initialValues: {},
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      app: Yup.object().shape({
        name: Yup.string().required()
      }),
      contact: Yup.object().shape({
        phone: Yup.string().required(),
        email: Yup.string().required(),
        address: Yup.string()
      })
    }),
    onSubmit: (settings, { resetForm }) => {
      updateSettings({ variables: { settings } })
    }
  })
  const { settings, loading } = useSettings()

  useEffect(() => {
    formik.setValues(settings)
  }, [loading])

  if (loading) return <Loading />

  return (
    <Box sx={{ maxWidth: 'sm' }}>
      <Box sx={{ display: 'grid', width: '100%', gap: 3 }}>
        <Typography variant="h5">Brand</Typography>
        <TextField id="app.name" {...formik}>
          Name
        </TextField>
        <Typography sx={{ mt: 2 }} variant="h5">
          Contact
        </Typography>
        <TextField id="contact.email" {...formik}>
          E-mail
        </TextField>
        <TextField id="contact.phone" {...formik}>
          Phone
        </TextField>
        <TextField id="contact.address" {...formik}>
          Address
        </TextField>
        <Actions
          left={[
            {
              children: 'Save',
              onClick: formik.handleSubmit,
              variant: 'contained',
              color: 'primary'
            }
          ]}
        />
      </Box>
    </Box>
  )
}

export default SettingsMain
