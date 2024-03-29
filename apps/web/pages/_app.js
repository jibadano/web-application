import Head from 'next/head'
import { useApollo } from 'lib/apollo'
import { ApolloProvider } from '@apollo/client'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import Email from '@components/app/email'
import Layout from '@components/app/layout'
import initTranslations from 'lib/i18next/init'
import config from '@jibadano/config'
import Cookies from 'js-cookie'

export const theme = createTheme(config.get('..settings.theme'))
initTranslations(config, Cookies.get('lang'))

const App = ({ Component, pageProps, router }) => {
  const apolloClient = useApollo(pageProps)
  const template = router.query && router.query.template
  if (template) return <Email template={template} />

  return (
    <>
      <Head>
        <title>{config.get('..settings.app.name')}</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component key={router.route} {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ApolloProvider>
      <style jsx global>
        {`
          body {
            margin: 0;
            overflow-x: hidden;
          }
        `}
      </style>
    </>
  )
}

export default App
