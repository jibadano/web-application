import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import FormSkeleton from './skeleton'
import EditIcon from '@mui/icons-material/Edit'
const FormContainer = ({
  title,
  edit,
  onSave,
  onCancel,
  onEdit,
  loading,
  children
}) => (
  <Box
    sx={{
      minHeight: 300,
      maxWidth: '100%',
      pb: 6,
      display: 'grid',
      gap: 4
    }}
  >
    {loading ? (
      <FormSkeleton />
    ) : (
      <>
        <Divider />
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h5" sx={{ px: 1 }}>
              {title}
            </Typography>
          </Box>
          {edit ? (
            <Button onClick={onCancel} variant="outlined" color="error">
              Cancel
            </Button>
          ) : (
            !!onEdit && (
              <Button onClick={onEdit}>
                <EditIcon />
              </Button>
            )
          )}
        </Box>

        {children}

        {!!edit && (
          <Box sx={{ pb: 2 }}>
            <Button fullWidth size="large" variant="contained" onClick={onSave}>
              Save
            </Button>
          </Box>
        )}
        <Divider />
      </>
    )}
  </Box>
)

export default FormContainer
