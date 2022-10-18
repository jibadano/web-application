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
