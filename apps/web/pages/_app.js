import Head from 'next/head'
import { useApollo } from 'common-lib/apollo'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@mui/material/styles'
import Email from '@components/app/email'
import Layout from '@components/app/layout'
import 'common-lib/i18next/init'
import theme from 'common-lib/theme'
import config from 'common-lib/config'

const App = ({ Component, pageProps, router }) => {
  const apolloClient = useApollo(pageProps)
  const template = router.query && router.query.template
  if (template) return <Email template={template} />

  return (
    <>
      <Head>
        <title>{config.get('settings.app.name')}</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component key={router.route} {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ApolloProvider>
      {/*   <style jsx global>
        {`
          body {
            margin: 0;
            overflow-x: hidden;
          }
        `}
      </style> */}
    </>
  )
}

export default App
