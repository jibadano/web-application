import React from 'react'
import TextField from 'form/textField'
import { useTranslation } from 'lib/i18next'
import ImageUpload from 'image/upload'
import config from '@jibadano/config'
import { useUpdateUser } from './hooks'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormContainer from '@backoffice/components/common/formContainer'
import { useUser, useMe } from './hooks'
import { useRole } from '../auth/hooks'

const UserEdit = ({ _id, onDone = () => {} }) => {
  const { me } = useMe()
  const role = useRole()
  const { user, loading } = useUser(_id)
  const [edit, setEdit] = React.useState()
  const { t } = useTranslation()
  const [updateUser] = useUpdateUser()
  const formik = useFormik({
    initialValues: user,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().nullable(),
      avatar: Yup.string().nullable(),
      jobTitle: Yup.string().nullable()
    }),
    onSubmit: (variables) => {
      updateUser({
        variables: { _id, ...variables }
      }).then(onDone)
    }
  })

  const allowedToEdit = (me && me._id == _id) || role == 'ADMIN'
  formik.disabled = !edit
  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <FormContainer
        title={_id}
        edit={edit}
        loading={loading}
        onEdit={allowedToEdit && (() => setEdit(true))}
        onCancel={() => {
          formik.setValues(user)
          setEdit(false)
        }}
        onSave={formik.handleSubmit}
      >
        <ImageUpload
          id="avatar"
          buttonText={t('Add image')}
          preview
          crop={{ aspect: 1 }}
          cloudName={config.get('..services.core.cloudinary.cloud_name')}
          {...formik}
        >
          Avatar
        </ImageUpload>
        <TextField id="name" {...formik}>
          {t('Name')}
        </TextField>
        <TextField id="jobTitle" {...formik}>
          {t('Job title')}
        </TextField>
      </FormContainer>
    </form>
  )
}

export default UserEdit
