import { useSnackbar } from 'notistack'
import { ApolloError } from '@apollo/client'
import get from 'lodash/get'
export const useOnError = () => {
  const { enqueueSnackbar } = useSnackbar()
  return (error) => {
    if (!error) return
    let message
    if (error instanceof ApolloError)
      message = get(error, 'graphQLErrors.0.message')
    else if (error instanceof Error) message = error.message
    else message = error.toString()

    enqueueSnackbar(message, { variant: 'error' })
  }
}

export const useOnSuccess = () => {
  const { enqueueSnackbar } = useSnackbar()
  return (message, content) =>
    enqueueSnackbar(message, { variant: 'success', content })
}

export const useOnInfo = () => {
  const { enqueueSnackbar } = useSnackbar()
  return (message, action) =>
    enqueueSnackbar(message, {
      variant: 'info',
      persist: true,
      preventDuplicate: true,
      action
    })
}
