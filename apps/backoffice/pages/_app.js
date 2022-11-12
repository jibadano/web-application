import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { blue, cyan, blueGrey, common } from '@mui/material/colors'
import 'lib/i18next/init'
import Layout from '@backoffice/components/layout'
import { SnackbarProvider } from 'notistack'
import GlobalStyles from '@mui/material/GlobalStyles'
import Auth from '@backoffice/components/auth'
import Email from '@backoffice/components/email'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apollo'

export const theme = createTheme({
  palette: {
    background: {
      dark: '#ccc',
      default: '#fdfdfe',
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
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        variant: 'outlined'
      }
    }
  },
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

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
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
        backgroundColor: theme.palette.background.default,
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
      },
      '.map-container': {
        height: 400
      },
      '.sidebar': {
        backgroundColor: '#000',
        color: '#000'
      }
    }}
  />
)

const App = ({ Component, pageProps, router }) => {
  const apolloClient = useApollo(pageProps)

  const template = router.query && router.query.template
  if (template) return <Email template={template} />

  return (
    <>
      <Head>
        <title>Backoffice</title>
        <meta charSet="utf-8" />
        <meta name="theme-color" content={theme.palette.background.default} />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="favicon.ico" />
        <link rel="apple-touch-icon" href="favicon.ico"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300;1,400&family=Source+Sans+Pro:wght@200;300;400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <Auth>
              <Layout>
                <Component key={router.route} {...pageProps} />
              </Layout>
            </Auth>
          </SnackbarProvider>
          {inputGlobalStyles}
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}

export default App
