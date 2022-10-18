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
        .test('confirm', t('Passwords do not match'), function (confirm) {
          return this.parent.password === confirm
        })
        .required(t('Must confirm your password'))
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
        title="Security"
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
          helpText={!!edit && "E-mail can't be updated"}
          {...formik}
        >
          {t('E-mail')}
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
          {t('Role')}
        </Select>
        <Password id="password" {...formik}>
          {t('Password')}
        </Password>

        <Password id="passwordConfirm" {...formik}>
          {t('Password Confirm')}
        </Password>
      </FormContainer>
    </form>
  )
}

export default UserEdit
