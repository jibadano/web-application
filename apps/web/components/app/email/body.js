import React from 'react'

import { useTranslation } from 'common-lib/i18next'
import Copyright from '../brand/copyright'
import Logo from '../brand/logo'

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
