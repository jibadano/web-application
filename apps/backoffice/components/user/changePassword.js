import React from 'react'
import { useTranslation } from 'lib/i18next'
import Password from 'form/password'
import { useCredential, useUpdatePassword } from '../auth/hooks'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormContainer from '@backoffice/components/common/formContainer'
import { useMe } from './hooks'

const ChangePassword = ({ _id }) => {
  const { me } = useMe()
  const [edit, setEdit] = React.useState()
  const { t } = useTranslation()
  const { credential, loading } = useCredential(_id)
  const [updatePassword] = useUpdatePassword()

  const formik = useFormik({
    initialValues: credential,
    validateOnBlur: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().nullable(),
      password: Yup.string().nullable(),
      passwordConfirm: Yup.mixed()
        .test(
          'confirm',
          t('backoffice.user.password.confirm.error.notmatch'),
          function (confirm) {
            return this.parent.password === confirm
          }
        )
        .required(t('backoffice.required'))
    }),
    onSubmit: (variables) =>
      updatePassword({
        variables: { _id, password: variables.password }
      }).then(() => setEdit())
  })

  const allowedToEdit = me && me._id == _id
  if (!allowedToEdit) return ''
  formik.disabled = !edit
  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <FormContainer
        title={t('backoffice.user.password')}
        edit={edit}
        loading={loading}
        onEdit={() => setEdit(true)}
        onCancel={() => {
          formik.setValues({ _id: credential._id })
          setEdit(false)
        }}
        onSave={formik.handleSubmit}
      >
        <Password id="currentPassword" {...formik}>
          {t('backoffice.user.password.current')}
        </Password>
        <Password id="password" {...formik}>
          {t('backoffice.user.password')}
        </Password>
        <Password id="passwordConfirm" {...formik}>
          {t('backoffice.user.password.confirm')}
        </Password>
      </FormContainer>
    </form>
  )
}

export default ChangePassword
