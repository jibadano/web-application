import React from 'react'
import { useLogout } from './hooks'
import IconButton from '@mui/material/IconButton'
import LogOutIcon from '@mui/icons-material/PowerSettingsNew'

const LogOut = () => {
  const logout = useLogout()

  return (
    <IconButton onClick={logout}>
      <LogOutIcon fontSize="small" />
    </IconButton>
  )
}

export default LogOut
