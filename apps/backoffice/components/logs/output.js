import React from 'react'
import Box from '@mui/material/Box'
import { useConsoleOutputs } from './hooks'
import CardSkeleton from '../common/card/skeleton'
const LogsOutput = () => {
  const { consoleOutputs, loading } = useConsoleOutputs()

  if (loading) return <CardSkeleton />
  return (
    <Box
      sx={{
        minHeight: '80vh',
        overflow: 'scroll',
        borderRadius: (theme) => theme.shape.borderRadius + 'px',
        backgroundColor: '#1e1e1e',
        p: 3
      }}
    >
      {consoleOutputs.map(({ date, type, value }) => (
        <Box
          sx={{
            fontFamily: 'monospace',
            color: {
              error: 'error.light',
              info: 'info.light',
              warning: 'warning.light',
              log: 'common.white'
            }[type]
          }}
          key={date.toString()}
        >
          {date.toString()} | {value}
        </Box>
      ))}
    </Box>
  )
}

export default LogsOutput
