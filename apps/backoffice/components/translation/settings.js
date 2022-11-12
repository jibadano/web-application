import React from 'react'
import get from 'lodash/get'
import { useTranslation } from 'lib/i18next'

import ListField from 'form/listField'
import Select from 'form/select'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  useSettings,
  useUpdateSettings
} from '@backoffice/components/settings/hooks'
import FormContainer from '@backoffice/components/common/formContainer'

const TranslationSettings = () => {
  const { t } = useTranslation()
  const [edit, setEdit] = React.useState()
  const [updateSettings, { loading: refreshing }] = useUpdateSettings()
  const { settings, loading } = useSettings()

  const formik = useFormik({
    initialValues: settings,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      i18next: Yup.object().shape({
        fallbackLng: Yup.string().nullable(),
        whitelist: Yup.array().of(Yup.string()),
        keySeparator: Yup.boolean().nullable()
      })
    }),
    onSubmit: (settings, { resetForm }) => {
      updateSettings({ variables: { settings } })
    }
  })

  formik.disabled = !edit
  return (
    <FormContainer
      loading={loading}
      title={t('backoffice.translation.languages')}
      edit={edit}
      onEdit={() => setEdit(true)}
      onCancel={() => {
        formik.setValues(settings)
        setEdit(false)
      }}
      onSave={formik.handleSubmit}
    >
      <ListField id="i18next.whitelist" {...formik}>
        {t('backoffice.translation.languages')}
      </ListField>
      <Select
        id="i18next.fallbackLng"
        options={(get(formik, 'values.i18next.whitelist') || []).map(
          (value) => ({ name: value, value })
        )}
        {...formik}
      >
        {t('backoffice.default')}
      </Select>
    </FormContainer>
  )
}

export default TranslationSettings
