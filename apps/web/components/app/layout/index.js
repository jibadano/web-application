import React from 'react'
import Footer from './footer'
import Header from './header'

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default Layout
