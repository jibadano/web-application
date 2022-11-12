import React from 'react'
import { useTranslation } from 'lib/i18next'
import TextField from 'form/textField'
import Typography from '@mui/material/Typography'
import FormContainer from '@backoffice/components/common/formContainer'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  useSettings,
  useUpdateSettings
} from '@backoffice/components/settings/hooks'

const SettingsMain = () => {
  const { t } = useTranslation()
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

  formik.disabled = !edit
  return (
    <FormContainer
      loading={loading}
      title={t('backoffice.settings.main')}
      edit={edit}
      onEdit={() => setEdit(true)}
      onCancel={() => {
        formik.setValues(settings)
        setEdit(false)
      }}
      onSave={formik.handleSubmit}
    >
      <Typography variant="h6" sx={{ px: 1, color: !edit && 'text.disabled' }}>
        {t('backoffice.settings.main.brand')}
      </Typography>
      <TextField id="app.name" {...formik}>
        {t('backoffice.settings.main.name')}
      </TextField>
      <Typography
        sx={{ mt: 2, px: 1, color: !edit && 'text.disabled' }}
        variant="h6"
      >
        {t('backoffice.settings.main.contact')}
      </Typography>
      <TextField id="contact.email" {...formik}>
        {t('backoffice.settings.main.contact.email')}
      </TextField>
      <TextField id="contact.phone" {...formik}>
        {t('backoffice.settings.main.contact.phone')}
      </TextField>
      <TextField id="contact.address" {...formik}>
        {t('backoffice.settings.main.contact.address')}
      </TextField>
    </FormContainer>
  )
}

export default SettingsMain
