import React from 'react'
import { useRouter } from 'lib/router'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'lib/i18next'
import * as Yup from 'yup'
import CircularProgress from '@mui/material/CircularProgress'
import { useLogin } from './hooks'
import Logo from '@components/app/brand/logo'
import Language from '@jibadano/language'

import TextField from 'form/textField'
import Password from 'form/password'
import { useFormik, Form } from 'formik'

export default () => {
  const [login, { loading }] = useLogin()
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      _id: '',
      password: ''
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      _id: Yup.string().required(t('We need this to proceed')),
      password: Yup.string().required(t('We need this to proceed')),
      rembemer: Yup.bool()
    }),
    onSubmit: ({ _id, password }, { setValues }) =>
      login({ variables: { _id, password } }).finally(() =>
        setValues({ _id, password: '' })
      )
  })

  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        width: '100%',
        height: '100%'
      }}
    >
      <Box
        maxWidth="sm"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        <Box sx={{ m: 2 }}>
          <Logo fontSize={36} />
        </Box>
        <Box
          sx={{
            my: 2,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">{t('Sign in')}</Typography>
        </Box>
        <Box sx={{ my: 2, display: 'grid', gap: 3, width: '100%' }}>
          <TextField id="_id" {...formik}>
            {t('Username or e-mail')}
          </TextField>
          <Password id="password" {...formik}>
            {t('Password')}
          </Password>
          <Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ height: 56 }}
              onClick={formik.handleSubmit}
              disabled={loading}
              size="large"
            >
              {loading ? <CircularProgress size={32} /> : t('Sign in')}
            </Button>
          </Box>
        </Box>
        <Language i18n={i18n} variant="outlined" />
      </Box>
    </Box>
  )
}
