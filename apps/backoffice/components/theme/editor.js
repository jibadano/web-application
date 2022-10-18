import React from 'react'
import Loading from '@backoffice/components/common/loading'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Color from 'form/color'
import Slider from 'form/slider'

import {
  useSettings,
  useUpdateSettings
} from '@backoffice/components/settings/hooks'
import FormContainer from '@backoffice/components/common/formContainer'
import ThemePreview from './preview'

const ThemeSettings = () => {
  const [edit, setEdit] = React.useState()
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
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FormContainer
          loading={loading}
          title="Theme settings"
          edit={edit}
          onEdit={() => setEdit(true)}
          onCancel={() => {
            formik.setValues(settings)
            setEdit(false)
          }}
          onSave={formik.handleSubmit}
        >
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
          <Slider id="theme.typography.fontSize" {...formik}>
            Font size
          </Slider>
        </FormContainer>
      </Grid>
      <Grid item xs={12} md={8}>
        <ThemePreview themeSettings={formik.values.theme} />
      </Grid>
    </Grid>
  )
}

export default ThemeSettings
