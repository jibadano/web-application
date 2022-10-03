import React from 'react'

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
  const [edit, setEdit] = React.useState()
  const [updateSettings] = useUpdateSettings()
  const { settings, loading } = useSettings()

  const formik = useFormik({
    initialValues: settings,
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
    onSubmit: (settings) => {
      updateSettings({ variables: { settings } })
      setEdit()
    }
  })

  if (loading) return <Loading />

  formik.disabled = !edit
  return (
    <Box sx={{ maxWidth: 'sm', px: { md: 1, sm: 0 }, display: 'grid', gap: 3 }}>
      <Typography variant="h5" sx={{ px: 1, color: !edit && 'text.disabled' }}>
        Brand
      </Typography>
      <TextField id="app.name" {...formik}>
        Name
      </TextField>
      <Typography
        sx={{ mt: 2, px: 1, color: !edit && 'text.disabled' }}
        variant="h5"
      >
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
  )
}

export default SettingsMain
