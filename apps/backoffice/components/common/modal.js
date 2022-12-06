import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const Modal = ({ title, children, actions, open, onClose, ...props }) => {
  return (
    <Dialog maxWidth="md" onClose={onClose} open={open} {...props}>
      {onClose && (
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ position: 'absolute', right: 0, m: 2 }}
        >
          <CloseIcon />
        </IconButton>
      )}
      {title && (
        <DialogTitle sx={{ p: 3, mr: 6 }}>
          <Typography variant="h5">{title}</Typography>
        </DialogTitle>
      )}
      <DialogContent sx={{ p: 4 }}>{children}</DialogContent>
      {actions && (
        <DialogActions sx={{ backgroundColor: 'grey.100', p: 2 }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default Modal
