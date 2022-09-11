import 'react-json-pretty/themes/1337.css'
import React from 'react'
import JSONPretty from 'react-json-pretty'
import Dialog from '@mui/material/Dialog'

const LogData = ({ data, onClose }) => (
  <Dialog
    maxWidth="lg"
    onClose={onClose}
    open={Boolean(data)}
    PaperProps={{ elevation: 8, variant: 'elevation' }}
    TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}
  >
    {data && (
      <JSONPretty
        data={data}
        mainStyle="padding:40px;margin:0"
        errorStyle="padding:40px;margin:0"
      />
    )}
  </Dialog>
)

export default LogData
