import React from 'react'
import TextField from 'form/textField'
import Password from 'form/password'
import Select from 'form/select'
import { useTranslation } from 'lib/i18next'
import { useSignup, useExists } from '../auth/hooks'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormContainer from '@backoffice/components/common/formContainer'

const UserNew = ({ onDone = () => {} }) => {
  const { t } = useTranslation()
  const [signup] = useSignup()
  const exists = useExists()
  const formik = useFormik({
    initialValues: { _id: '' },
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      _id: Yup.string()
        .nullable()
        .email(t('This is not a valid e-mail'))
        .required(t('We need this to proceed'))
        .test('alreadyExists', t('This user already exists'), async (_id) =>
          _id ? exists.refetch({ _id }).then(({ data }) => !data.exists) : false
        ),
      password: Yup.string().nullable(),
      role: Yup.string().nullable()
    }),
    onSubmit: (variables) =>
      signup({
        variables
      }).then(onDone)
  })

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <FormContainer
        title="New user"
        edit
        onCancel={onDone}
        onSave={formik.handleSubmit}
      >
        <TextField id="_id" asyncValidation={exists} {...formik}>
          {t('E-mail')}
        </TextField>
        <Password id="password" {...formik}>
          {t('Password')}
        </Password>
        <Select
          id="role"
          options={[
            { value: 'USER', name: 'User' },
            { value: 'GUEST', name: 'Guest' },
            { value: 'ADMIN', name: 'Admin' }
          ]}
          {...formik}
        >
          {t('Role')}
        </Select>
      </FormContainer>
    </form>
  )
}

export default UserNew
