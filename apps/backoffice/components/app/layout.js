import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import Menu from '@jibadano/backoffice-components/menu'
import Footer from '@jibadano/backoffice-components/footer'

import config from 'lib/config'
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  FileText as OrdersIcon,
  Server as LogsIcon,
  User as UsersIcon
} from 'react-feather'
import Logo from '@components/app/brand/logo'
import { useMe } from './user/hooks'
import { useLogout } from './auth/hooks'

const items = [
  {
    href: '/',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/article',
    icon: OrdersIcon,
    title: 'Articles'
  },
  {
    href: '/user',
    icon: UsersIcon,
    title: 'Users'
  },
  {
    href: '/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/logs',
    icon: LogsIcon,
    title: 'Logs'
  }
]

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
    paddingTop: theme.spacing(6),

    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  container: {
    width: '100%',
    padding: theme.spacing(3, 3, 5, 3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 4, 5, 4)
    }
  }
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()
  const { me } = useMe()
  const logout = useLogout()

  return (
    <>
      <Menu
        logo={<Logo />}
        items={items}
        onLogOut={logout}
        onUserClick={() => router.push('/user')}
        user={me}
        accountButtonText={t('Configure your profile')}
        onChange={router.push}
      />
      <div className={classes.wrapper}>
        <div className={classes.container}>
          {children}
          <Footer name={config.get('settings.app.name')} />
        </div>
      </div>
    </>
  )
}

export default Layout
