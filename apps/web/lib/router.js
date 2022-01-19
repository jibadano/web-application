import Router, { useRouter as useRouterOriginal } from 'next/router'

export const useRouter = () => {
  const router = useRouterOriginal()

  const push = (route, options) => {
    router.push(route, options).then(() => {
      try {
        window.scrollTo(0, 0)
      } catch (e) {
        //ignore
      }
    })
  }

  return { ...router, push }
}

export default Router
