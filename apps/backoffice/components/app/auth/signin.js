import React from 'react'
import { useRouter } from 'lib/router'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { Formik } from 'formik'
import { useTranslation } from 'lib/i18next'
import * as Yup from 'yup'
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'
import { useLogin } from './hooks'
import Container from '@mui/material/Container'
import Logo from '@components/app/brand/logo'
import Language from '@jibadano/language'
import TextField from '@jibadano/form/textField'
import Password from '@jibadano/form/password'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  avatar: {
    margin: theme.spacing(1),
    background: theme.palette.primary.gradient
  },
  form: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}))

export default () => {
  const classes = useStyles()
  const [login, { loading }] = useLogin()
  const { t, i18n } = useTranslation()
  const router = useRouter()
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{
        _id: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        _id: Yup.string().required(t('We need this to proceed')),
        password: Yup.string().required(t('We need this to proceed')),
        rembemer: Yup.bool()
      })}
      onSubmit={({ _id, password }, { setValues }) =>
        login({ variables: { _id, password } })
          .then(() => router.push('/'))
          .finally(() => setValues({ _id, password: '' }))
      }
    >
      {({ handleSubmit, ...props }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          <Container maxWidth="sm">
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Logo size={120} />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <div>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography variant="h5">{t('Sign in')}</Typography>
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField id="_id" {...props}>
                  {t('Username or e-mail')}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Password id="password" {...props}>
                  {t('Password')}
                </Password>
              </Grid>

              <Grid item xs={12} className={classes.wrapper}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={loading}
                  size="large"
                >
                  {t('Sign in')}
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <Language i18n={i18n} variant="outlined" />
              </Grid>
            </Grid>
          </Container>
        </form>
      )}
    </Formik>
  )
}
