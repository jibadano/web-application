import React from 'react'
import TextField from '@jibadano/form/textField'
import { useTranslation } from 'common-lib/i18next'
import Paper from '@mui/material/Paper'
import ImageUpload from '@jibadano/image/upload'
import Actions from '@jibadano/backoffice-components/actions'

import config from 'common-lib/config'
import { useUpdateUser } from './hooks'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    '& > *': {
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3)
    }
  }
}))
const UserEdit = ({ _id, name, avatar, jobTitle, onDone = () => {} }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [updateUser] = useUpdateUser()
  return (
    <Paper>
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
                cloudName={config.get('core.cloudinary.cloud_name')}
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
                  { children: 'Cancel', variant: 'text', onClick: onDone }
                ]}
                right={[
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
    </Paper>
  )
}

export default UserEdit
