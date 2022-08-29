import React from 'react'
import { useRouter } from 'next/router'
import { Grid, Box, Button, Collapse, Typography } from '@mui/material'
import { useTraceFacets } from '@backoffice/components/app/logs/hooks'
import FilterIcon from '@mui/icons-material/FilterList'
import RemoveIcon from '@mui/icons-material/Close'
import Loading from '@backoffice/components/app/loading'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Toggle from 'form/toggle'
const LogsFilters = ({ onChange }) => {
  const router = useRouter()

  const [filters, setFilters] = React.useState(router.query)
  const [expanded, setExpanded] = React.useState()
  const { facets, loading: facetsLoading } = useTraceFacets()

  const handleChange = (e) => {
    setFilters({ [e.target.id]: e.target.value })
  }

  const handleBlur = (e) => {
    if (router.query[e.target.id] == e.target.value) return
    if (Boolean(e.target.value)) router.query[e.target.id] = e.target.value
    else delete router.query[e.target.id]
    handleChange(e)
    handleSubmit(router.query)
  }

  const handleSubmit = (query) => {
    router.replace({ query })
  }

  const handleReset = () => {
    setFilters((filters) => {
      Object.keys(filters).forEach((key) => {
        filters[key] = ''
      })

      return filters
    })
    handleSubmit({})
  }

  React.useEffect(() => {
    setFilters(router.query)
  }, [router.query])

  const hasFilter = Boolean(Object.keys(router.query).length)

  return (
    <Box>
      <Box sx={{ display: { md: 'flex', sm: 'block' }, m: 2 }}>
        <Box sx={{ flexGrow: 1, '& > *': { mr: 2 } }}>
          {hasFilter &&
            Object.keys(router.query).map((key) => (
              <Chip
                key={key}
                label={
                  <Typography variant="caption">
                    <b>{key}</b> {router.query[key]}
                  </Typography>
                }
                onDelete={() => handleBlur({ target: { id: key, value: '' } })}
              />
            ))}
        </Box>
        {hasFilter && (
          <Box mr={2}>
            <Button
              fullWidth
              onClick={handleReset}
              startIcon={<RemoveIcon />}
              variant="text"
              disableElevation
            >
              Clear
            </Button>
          </Box>
        )}
        <Box>
          <Button
            fullWidth
            startIcon={<FilterIcon />}
            onClick={() => setExpanded((expanded) => !expanded)}
            variant={hasFilter ? 'contained' : 'text'}
          >
            Filters
          </Button>
        </Box>
      </Box>
      <Collapse in={expanded}>
        <form
          autocomplete="off"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(filters)
          }}
        >
          {facetsLoading ? (
            <Loading />
          ) : (
            <Box p={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <TextField
                    size="small"
                    id="message"
                    label="Message"
                    value={filters.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: Boolean(filters.message)
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Toggle
                    size="small"
                    id="type"
                    options={[
                      { name: 'Log', value: 'log' },
                      { name: 'Info', value: 'info' },
                      { name: 'Err', value: 'error' },
                      { name: 'Warn', value: 'warning' }
                    ]}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Toggle
                    id="environment"
                    options={[
                      { name: 'Dev', value: 'development' },
                      { name: 'Staging', value: 'staging' },
                      { name: 'Prod', value: 'production' }
                    ]}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  {facets && facets.modules && facets.modules.length ? (
                    <Select
                      size="small"
                      id="module"
                      options={[{}].concat(
                        facets.modules.map(({ _id, count }) => ({
                          name: `${_id} (${count})`,
                          value: _id
                        }))
                      )}
                    >
                      Module
                    </Select>
                  ) : (
                    <TextField size="small" id="module">
                      Module
                    </TextField>
                  )}
                </Grid>
                <Grid item xs={12} md={3}>
                  {facets && facets.operations && facets.operations.length ? (
                    <Select
                      size="small"
                      id="operation"
                      options={[{}].concat(
                        facets.operations.map(({ _id, count }) => ({
                          name: `${_id} (${count})`,
                          value: _id
                        }))
                      )}
                    >
                      Operation
                    </Select>
                  ) : (
                    <TextField size="small" id="operation">
                      Operation
                    </TextField>
                  )}
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField size="small" id="_id">
                    Trace ID
                  </TextField>
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField size="small" id="user">
                    User
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField placeholder="127.0.0.1" size="small" id="ip">
                    IP
                  </TextField>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Date size="small" id="dateFrom" type="datetime-local">
                    Date from
                  </Date>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Date size="small" id="dateTo" type="datetime-local">
                    Date to
                  </Date>
                </Grid>
              </Grid>
            </Box>
          )}
        </form>
      </Collapse>
    </Box>
  )
}

export default LogsFilters
