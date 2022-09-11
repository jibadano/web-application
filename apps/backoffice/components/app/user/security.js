import React from 'react'
import { useTranslation } from 'lib/i18next'

import Typography from '@mui/material/Typography'
import TextField from 'form/textField'
import Password from 'form/password'
import Select from 'form/select'
import Actions from '@backoffice/components/app/actions'
import CardSkeleton from '@backoffice/components/app/cardSkeleton'

import { useCredential, useUpdateCredential } from '../auth/hooks'
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
const UserEdit = ({ _id, onDone = () => {} }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { credential, loading } = useCredential(_id)
  const [updateCredential] = useUpdateCredential()
  if (loading || !credential) return <CardSkeleton />
  return (
    <Formik
      enableReinitialize
      validateOnBlur={false}
      initialValues={{ _id: credential._id, role: credential.role }}
      validationSchema={Yup.object().shape({
        role: Yup.string().nullable(),
        password: Yup.string().nullable(),
        passwordConfirm: Yup.mixed()
          .test('confirm', t('Passwords do not match'), function (confirm) {
            return this.parent.password === confirm
          })
          .required(t('Must confirm your password'))
      })}
      onSubmit={(variables) =>
        updateCredential({
          variables
        }).then(onDone)
      }
    >
      {({ handleSubmit, handleReset, dirty, ...props }) => (
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Typography sx={{ my: 3 }} variant="h5">
            Security
          </Typography>
          <div className={classes.root}>
            <TextField
              id="_id"
              disabled
              helpText="E-mail can't be updated"
              {...props}
            >
              {t('E-mail')}
            </TextField>
            <Select
              id="role"
              disabled={credential.role != 'ADMIN'}
              options={[
                { value: 'ADMIN', name: 'Admin' },
                { value: 'GUEST', name: 'Guest' },
                { value: 'USER', name: 'User' }
              ]}
              {...props}
            >
              {t('Role')}
            </Select>
            <Password id="password" {...props}>
              {t('Password')}
            </Password>

            <Password id="passwordConfirm" {...props}>
              {t('Password Confirm')}
            </Password>

            <Actions
              left={[
                {
                  color: 'primary',
                  children: t('Update'),
                  variant: 'outlined',
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
