import React from 'react'
import TextField from 'form/textField'
import Password from 'form/password'
import Select from 'form/select'

import Actions from '@backoffice/components/app/actions'

import { useTranslation } from 'lib/i18next'

import Paper from '@mui/material/Paper'

import { useSignup, useExists } from '../auth/hooks'
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
const UserNew = ({ onDone = () => {} }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [signup] = useSignup()
  const exists = useExists()

  return (
    <Paper>
      <Formik
        enableReinitialize
        validateOnChange={false}
        initialValues={{ _id: '' }}
        validationSchema={Yup.object().shape({
          _id: Yup.string()
            .nullable()
            .email(t('This is not a valid e-mail'))
            .required(t('We need this to proceed'))
            .test('alreadyExists', t('This user already exists'), async (_id) =>
              _id
                ? exists.refetch({ _id }).then(({ data }) => !data.exists)
                : false
            ),
          password: Yup.string().nullable(),
          role: Yup.string().nullable()
        })}
        onSubmit={(variables) =>
          signup({
            variables
          }).then(onDone)
        }
      >
        {({ handleSubmit, handleReset, dirty, ...props }) => (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className={classes.root}>
              <TextField id="_id" asyncValidation={exists} {...props}>
                {t('E-mail')}
              </TextField>

              <Password id="password" {...props}>
                {t('Password')}
              </Password>

              <Select
                id="role"
                options={[
                  { value: 'USER', name: 'User' },
                  { value: 'GUEST', name: 'Guest' },
                  { value: 'ADMIN', name: 'Admin' }
                ]}
                {...props}
              >
                {t('Role')}
              </Select>

              <Actions
                left={[
                  { children: t('Cancel'), variant: 'text', onClick: onDone }
                ]}
                right={[
                  {
                    color: 'primary',
                    children: t('Create'),
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

export default UserNew
