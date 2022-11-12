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
        .email(t('backoffice.user.email.error.notEmail'))
        .required(t('backoffice.required'))
        .test(
          'alreadyExists',
          t('backoffice.user.email.error.alreadyExists'),
          async (_id) =>
            _id
              ? exists.refetch({ _id }).then(({ data }) => !data.exists)
              : false
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
        title={t('backoffice.user.new')}
        edit
        onCancel={onDone}
        onSave={formik.handleSubmit}
      >
        <TextField id="_id" asyncValidation={exists} {...formik}>
          {t('backoffice.user.email')}
        </TextField>
        <Password id="password" {...formik}>
          {t('backoffice.user.password')}
        </Password>
        <Select
          id="role"
          options={[
            { value: 'USER', name: t('backoffice.user.role.user') },
            { value: 'GUEST', name: t('backoffice.user.role.guest') },
            { value: 'ADMIN', name: t('backoffice.user.role.admin') }
          ]}
          {...formik}
        >
          {t('backoffice.user.role')}
        </Select>
      </FormContainer>
    </form>
  )
}

export default UserNew
