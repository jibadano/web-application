import React from 'react'
const EmailSubject = ({ children }) => (
  <div style={{ display: 'none' }}> {`SUBJECT_${children}_SUBJECT`}</div>
)

export default EmailSubject
