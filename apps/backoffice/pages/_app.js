import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { blue, cyan, blueGrey, common } from '@mui/material/colors'
import 'lib/i18next/init'
import Layout from '@backoffice/components/app/layout'
import { SnackbarProvider } from 'notistack'
import { makeStyles, createStyles } from '@mui/styles'
import SignIn from '@backoffice/components/app/auth/signin'
import Email from '@backoffice/components/app/email'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apollo'

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%'
      },
      body: {
        backgroundColor: '#f4f6f8',
        height: '100%',
        width: '100%',
        margin: 0,
        overflowX: 'hidden'
      },
      a: {
        textDecoration: 'none'
      },
      '#root': {
        height: '100%',
        width: '100%'
      },
      'body > div': {
        height: '100%'
      }
    }
  })
)

const GlobalStyles = () => {
  useStyles()

  return null
}

const theme = createTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: common.white,
      paper: common.white
    },
    primary: {
      main: blue[800]
    },
    secondary: {
      main: cyan[500]
    },
    text: {
      primary: blueGrey[800],
      secondary: blueGrey[700]
    }
  },
  shape: { borderRadius: 16 },
  shadows: [
    'none',
    '0 0 0 1px rgba(63,63,68,0.05), 0 1px 2px 0 rgba(63,63,68,0.15)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 2px 2px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 8px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 5px 8px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 6px 12px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 7px 12px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 6px 16px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 7px 16px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 8px 18px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 9px 18px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 10px 20px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 11px 20px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 12px 22px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 13px 22px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 14px 24px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 16px 28px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 18px 30px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 20px 32px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 22px 34px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 24px 36px -8px rgba(0,0,0,0.25)'
  ],
  typography: {
    h1: {
      fontWeight: 500,
      fontSize: 35,
      letterSpacing: '-0.24px'
    },
    h2: {
      fontWeight: 500,
      fontSize: 29,
      letterSpacing: '-0.24px'
    },
    h3: {
      fontWeight: 500,
      fontSize: 28,
      letterSpacing: '-0.06px'
    },
    h4: {
      color: blueGrey[900],
      marginTop: 10,
      fontWeight: 'bold',
      fontSize: 24,
      letterSpacing: '-0.06px'
    },
    h5: {
      color: blueGrey[900],
      fontWeight: 500,
      fontSize: 20,
      letterSpacing: '-0.05px'
    },
    h6: {
      fontWeight: 500,
      fontSize: 14,
      letterSpacing: '-0.05px'
    },
    overline: {
      fontWeight: 500
    }
  }
})

const App = ({ Component, pageProps, router }) => {
  const apolloClient = useApollo(pageProps)

  const template = router.query && router.query.template
  const auth = router.query && router.query.auth
  if (template) return <Email template={template} />

  return (
    <>
      <Head>
        <title>Backoffice</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <SnackbarProvider>
            {auth ? (
              <SignIn />
            ) : (
              <Layout>
                <Component key={router.route} {...pageProps} />
              </Layout>
            )}
          </SnackbarProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}

export default App
