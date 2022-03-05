import { useSnackbar, SnackbarProvider } from 'notistack'

export const NotificationService = SnackbarProvider
export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar()

  return {
    onSuccess: (message, content) =>
      enqueueSnackbar(message, { variant: 'success', content }),
    onError: (error) => {
      if (!error) return
      enqueueSnackbar(error, { variant: 'error' })
    },
    onInfo: (info, action) =>
      enqueueSnackbar(info, {
        variant: 'info',
        persist: true,
        preventDuplicate: true,
        action
      })
  }
}
