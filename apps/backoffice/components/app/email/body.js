import React from 'react'

import { useTranslation } from 'lib/i18next'
import Logo from '@components/brand/logo'

const EmailBody = ({ children }) => {
  const { t } = useTranslation()

  return (
    <>
      BODY_
      <Logo />
      {children}
      _BODY
    </>
  )
}

export default EmailBody
