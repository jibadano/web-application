import React from 'react'
import { useTranslation } from 'lib/i18next'
import TextField from 'form/textField'
import Select from 'form/select'
import { useCredential, useUpdateCredential } from '../auth/hooks'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormContainer from '@backoffice/components/common/formContainer'
import { useMe } from './hooks'
import { useRole } from '../auth/hooks'

const UserEdit = ({ _id }) => {
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
      role: Yup.string().nullable()
    }),
    onSubmit: (variables) =>
      updateCredential({
        variables
      }).then(() => setEdit())
  })

  const allowedToEdit = (me && me._id == _id) || role == 'ADMIN'
  if (!allowedToEdit) return ''

  formik.disabled = !edit
  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <FormContainer
        title={t('backoffice.user.security')}
        edit={edit}
        loading={loading}
        onEdit={() => setEdit(true)}
        onCancel={() => {
          formik.setValues({ _id: credential._id, role: credential.role })
          setEdit(false)
        }}
        onSave={formik.handleSubmit}
      >
        <TextField
          id="_id"
          helpText={!!edit && t('backoffice.user.email.info.disabled')}
          {...formik}
          disabled
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
      </FormContainer>
    </form>
  )
}

export default UserEdit
