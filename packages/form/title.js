import Typography from '@mui/material/Typography'

const FormTitle = ({ children, disabled }) => (
  <Typography variant="h5" sx={{ px: 1, color: disabled && 'text.disabled' }}>
    {children}
  </Typography>
)

export default FormTitle
