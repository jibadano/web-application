import React from 'react'
import Splash from '@backoffice/components/common/splash'
import SignIn from './signin'
import { useToken } from './hooks'

const Auth = ({ children }) => {
  const { data, loading } = useToken()

  if (loading) return <Splash />
  if (!data || !data.token) return <SignIn />

  return children
}

export default Auth
