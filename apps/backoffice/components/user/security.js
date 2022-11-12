import React from 'react'
import { useTranslation } from 'lib/i18next'
import TextField from 'form/textField'
import Password from 'form/password'
import Select from 'form/select'
import { useCredential, useUpdateCredential } from '../auth/hooks'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormContainer from '@backoffice/components/common/formContainer'
import { useMe } from './hooks'
import { useRole } from '../auth/hooks'

const UserEdit = ({ _id, onDone = () => {} }) => {
  const { me } = useMe()
  const role = useRole()
  const [edit, setEdit] = React.useState()
  const { t } = useTranslation()
  const { credential, loading } = useCredential(_id)
  const [updateCredential] = useUpdateCredential()

  const formik = useFormik({
    initialValues: credential,
    validateOnBlur: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      role: Yup.string().nullable(),
      password: Yup.string().nullable(),
      passwordConfirm: Yup.mixed()
        .test(
          'confirm',
          t('backoffice.user.passwordConfirm.error.notmatch'),
          function (confirm) {
            return this.parent.password === confirm
          }
        )
        .required(t('backoffice.required'))
    }),
    onSubmit: (variables) =>
      updateCredential({
        variables
      }).then(onDone)
  })

  const allowedToEdit = (me && me._id == _id) || role == 'ADMIN'
  formik.disabled = !edit
  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <FormContainer
        title={t('backoffice.user.security')}
        edit={edit}
        loading={loading}
        onEdit={allowedToEdit && (() => setEdit(true))}
        onCancel={() => {
          formik.setValues({ _id: credential._id, role: credential.role })
          setEdit(false)
        }}
        onSave={formik.handleSubmit}
      >
        <TextField
          id="_id"
          disabled
          helpText={!!edit && t('backoffice.user.email.info.disabled')}
          {...formik}
        >
          {t('backoffice.user.email')}
        </TextField>
        <Select
          id="role"
          options={[
            { value: 'ADMIN', name: 'Admin' },
            { value: 'GUEST', name: 'Guest' },
            { value: 'USER', name: 'User' }
          ]}
          {...formik}
          disabled={!edit || credential.role != 'ADMIN'}
        >
          {t('backoffice.user.role')}
        </Select>
        <Password id="password" {...formik}>
          {t('backoffice.user.password')}
        </Password>

        <Password id="passwordConfirm" {...formik}>
          {t('backoffice.user.passwordConfirm')}
        </Password>
      </FormContainer>
    </form>
  )
}

export default UserEdit
