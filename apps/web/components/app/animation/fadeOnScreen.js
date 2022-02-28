import React from 'react'
import Fade from '@mui/material/Fade'

const useOnScreen = (ref, delay = 0) => {
  const [isIntersecting, setIntersecting] = React.useState(false)

  const observer =
    typeof window != 'undefined' &&
    new IntersectionObserver(([entry]) =>
      setTimeout(() => {
        setIntersecting(entry.isIntersecting)
      }, delay)
    )

  React.useEffect(() => {
    observer && observer.observe(ref.current)

    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect()
    }
  }, [])

  return isIntersecting
}

const FadeOnScreen = ({ index = 0, children, timeout = 1000, ...props }) => {
  const [display, setDisplay] = React.useState()
  const ref = React.useRef()
  const isVisible = useOnScreen(ref, 200 + 200 * index)
  if (isVisible && !display) setDisplay(true)

  return (
    <Fade ref={ref} timeout={1000} in={display} {...props}>
      <div>{children}</div>
    </Fade>
  )
}

export default FadeOnScreen
