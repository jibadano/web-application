import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'

const DataList = ({
  title,
  header,
  children = [],
  onEdit,
  onRemove,
  orientation = 'vertical'
}) => {
  children = children instanceof Array ? children : [children]
  const hasActions = onEdit || onRemove
  return (
    <>
      <Box display={orientation == 'horizontal' && 'flex'}>
        {header && <Box width="100%">{header}</Box>}
        <Box width="100%">
          <List>
            {title && (
              <ListItem divider>
                <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                  {title}
                </Typography>
              </ListItem>
            )}
            {children.map((item, i) => (
              <ListItem key={i}>{item}</ListItem>
            ))}
          </List>
        </Box>
      </Box>
      {hasActions && (
        <Box display="flex" flexDirection="row-reverse" p={3}>
          {onEdit && (
            <Box marginLeft={2}>
              <Button
                variant="contained"
                disableElevation
                startIcon={<EditIcon />}
                color="primary"
                onClick={onEdit}
              >
                Edit
              </Button>
            </Box>
          )}
          {onRemove && (
            <Box>
              <Button onClick={onRemove}>Remove</Button>
            </Box>
          )}
        </Box>
      )}
    </>
  )
}

export default DataList
