import React from 'react'
import Footer from './footer'
import Header from './header'

export default ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)
