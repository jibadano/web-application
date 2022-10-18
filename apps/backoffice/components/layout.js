import React from 'react'
import Menu from '@backoffice/components/menu'
import Footer from '@backoffice/components/footer'
import Box from '@mui/material/Box'

const Layout = ({ children }) => (
  <>
    <Menu />
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden',
        pt: 6,
        pl: { md: '256px', xs: 0 }
      }}
    >
      <Box
        sx={{
          width: '100%',
          pt: { xs: 4, md: 2 },
          pr: { xs: 2, md: 5 },
          pb: { xs: 8, md: 5 },
          pl: { xs: 2, md: 5 }
        }}
      >
        {children}
        <Footer />
      </Box>
    </Box>
  </>
)

export default Layout
