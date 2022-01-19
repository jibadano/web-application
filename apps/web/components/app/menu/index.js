import React from 'react'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'
import Mobile from './mobile'
import Desktop from './desktop'

const menuItems = [
  {
    name: 'about',
    value: '/about'
  },
  {
    name: 'instructors',
    value: '/instructors'
  },
  {
    name: 'classes',
    value: '/classes'
  },
  {
    name: 'location',
    value: '/location'
  },
  {
    name: 'blog',
    value: '/blog'
  }
]

const Menu = () => {
  const router = useRouter() || {}
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return mobile ? (
    <Mobile
      menuItems={menuItems}
      route={router.route}
      onChange={(newRoute) => router.push(newRoute)}
    />
  ) : (
    <Desktop
      menuItems={menuItems}
      route={router.route}
      onChange={(newRoute) => router.push(newRoute)}
    />
  )
}
export default Menu
