import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  FileText as OrdersIcon,
  Server as LogsIcon,
  User as UsersIcon
} from 'react-feather'

export default [
  {
    href: '/',
    icon: BarChartIcon,
    title: 'backoffice.dashboard'
  },
  {
    href: '/article',
    icon: OrdersIcon,
    title: 'backoffice.articles'
  },
  {
    href: '/user',
    icon: UsersIcon,
    title: 'backoffice.users'
  },
  {
    href: '/settings',
    icon: SettingsIcon,
    title: 'backoffice.settings'
  },
  {
    href: '/logs',
    icon: LogsIcon,
    title: 'backoffice.audition'
  }
]
