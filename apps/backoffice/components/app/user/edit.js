import React from 'react'
import TextField from 'form/textField'
import { useTranslation } from 'lib/i18next'
import Paper from '@mui/material/Paper'
import ImageUpload from 'image/upload'
import Actions from '@backoffice/components/app/actions'

import config from '@jibadano/config'
import { useUpdateUser } from './hooks'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.breakpoints.values.sm,
    '& > *': {
      marginBottom: theme.spacing(4)
    }
  }
}))
const UserEdit = ({ _id, name, avatar, jobTitle, onDone = () => {} }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [updateUser] = useUpdateUser()
  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      initialValues={{ name, avatar, jobTitle }}
      validationSchema={Yup.object().shape({
        name: Yup.string().nullable(),
        avatar: Yup.string().nullable(),
        jobTitle: Yup.string().nullable()
      })}
      onSubmit={(variables) =>
        updateUser({
          variables: { _id, ...variables }
        }).then(onDone)
      }
    >
      {({ handleSubmit, handleReset, dirty, ...props }) => (
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.root}>
            <ImageUpload
              id="avatar"
              buttonText={t('Add image')}
              preview
              crop={{ aspect: 1 }}
              cloudName={config.get('..services.core.cloudinary.cloud_name')}
              {...props}
            >
              Avatar
            </ImageUpload>
            <TextField id="name" {...props}>
              {t('Name')}
            </TextField>
            <TextField id="jobTitle" {...props}>
              {t('Job title')}
            </TextField>

            <Actions
              left={[
                {
                  children: 'Save',
                  variant: 'contained',
                  color: 'primary',
                  onClick: handleSubmit
                }
              ]}
            />
          </div>
        </form>
      )}
    </Formik>
  )
}

export default UserEdit
