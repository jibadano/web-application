import React from 'react'
import Box from '@mui/material/Box'
import Loading from '@backoffice/components/common/loading'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import FormSkeleton from './skeleton'

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
    component={Paper}
    sx={{
      minHeight: 300,
      maxWidth: 'sm',
      p: 4,
      pb: 6,
      display: 'grid',
      gap: 4
    }}
  >
    {loading ? (
      <FormSkeleton />
    ) : (
      <>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h5" sx={{ px: 1 }}>
              {title}
            </Typography>
          </Box>
          <Box>
            {edit ? (
              <Button onClick={onCancel} variant="outlined" color="error">
                Cancel
              </Button>
            ) : (
              !!onEdit && <Button onClick={onEdit}>Edit</Button>
            )}
          </Box>
        </Box>

        {children}

        {!!edit && (
          <Box sx={{ pb: 2 }}>
            <Button fullWidth size="large" variant="contained" onClick={onSave}>
              Save
            </Button>
          </Box>
        )}
      </>
    )}
  </Box>
)

export default FormContainer
