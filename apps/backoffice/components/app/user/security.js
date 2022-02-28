import React from 'react'
import { useTranslation } from 'common-lib/i18next'

import Paper from '@mui/material/Paper'
import TextField from '@jibadano/form/textField'
import Password from '@jibadano/form/password'
import Select from '@jibadano/form/select'
import Actions from '@jibadano/backoffice-components/actions'
import CardSkeleton from '@jibadano/backoffice-components/cardSkeleton'

import { useCredential, useUpdateCredential } from '../auth/hooks'
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
const UserEdit = ({ _id, onDone = () => {} }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { credential, loading } = useCredential(_id)
  const [updateCredential] = useUpdateCredential()
  if (loading || !credential) return <CardSkeleton />
  return (
    <Paper>
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
                  { children: t('Cancel'), variant: 'text', onClick: onDone }
                ]}
                right={[
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
    </Paper>
  )
}

export default UserEdit
