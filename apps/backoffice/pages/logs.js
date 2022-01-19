import React from 'react'
import { useRouter } from 'next/router'
import {
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box
} from '@mui/material'
import {
  useTraces,
  useTraceFacets
} from '@backoffice/components/app/logs/hooks'
import * as Yup from 'yup'
import 'react-json-pretty/themes/1337.css'
import Typography from '@mui/material/Typography'
import FilterIcon from '@mui/icons-material/FilterList'
import RemoveIcon from '@mui/icons-material/Close'
import { Formik } from 'formik'

import Loading from '@jibadano/backoffice-components/loading'
import LogTable from '@jibadano/backoffice-components/logTable'
import Title from '@jibadano/backoffice-components/title'
import Actions from '@jibadano/backoffice-components/actions'

import TextField from '@jibadano/form/textField'
import Toggle from '@jibadano/form/toggle'
import Select from '@jibadano/form/select'

const Filter = ({ onChange, filters }) => {
  const { data, loading, error } = useTraceFacets()
  if (loading) return <Loading />
  const facets = data && data.traceFacets
  const hasFilter = Object.keys(filters).length

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={filters}
      validationSchema={Yup.object().shape({
        _id: Yup.string().nullable(),
        operation: Yup.string().nullable(),
        environment: Yup.string().nullable(),
        user: Yup.string().nullable(),
        ip: Yup.string().nullable(),
        module: Yup.string().nullable(),
        message: Yup.string().nullable(),
        type: Yup.string().nullable(),
        dateFrom: Yup.date().nullable(),
        dateTo: Yup.date().nullable()
      })}
      onSubmit={(values) => {
        if (values.module == 'any') delete values.module
        if (values.operation == 'any') delete values.operation
        if (!values.type) delete values.type
        if (!values.environment) delete values.environment

        onChange(values)
      }}
    >
      {({ handleSubmit, ...props }) => (
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Accordion elevation={0} style={{ backgroundColor: 'transparent' }}>
            <AccordionSummary>
              <Actions
                right={[
                  {
                    display: Boolean(hasFilter),
                    startIcon: <RemoveIcon />,
                    children: 'Clear',
                    onClick: (event) => {
                      event.preventDefault()
                      onChange({})
                    },
                    variant: 'text',
                    size: 'small',
                    disableElevation: true
                  },
                  {
                    startIcon: <FilterIcon />,
                    children: 'Filters',
                    variant: hasFilter ? 'contained' : 'text',
                    size: 'small'
                  }
                ]}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Box p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography
                      style={{ paddingTop: 20 }}
                      color="textSecondary"
                      variant="h5"
                    >
                      Log
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      onClick={(e) => e.stopPropagation()}
                      id="message"
                      {...props}
                    >
                      Message
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Toggle
                      size="large"
                      id="type"
                      options={[
                        { name: 'Log', value: 'log' },
                        { name: 'Info', value: 'info' },
                        { name: 'Err', value: 'error' },
                        { name: 'Warn', value: 'warning' }
                      ]}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      style={{ paddingTop: 20 }}
                      color="textSecondary"
                      variant="h5"
                    >
                      Trace
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField size="large" id="_id" {...props}>
                      Trace ID
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Toggle
                      id="environment"
                      options={[
                        { name: 'Dev', value: 'development' },
                        { name: 'Staging', value: 'staging' },
                        { name: 'Prod', value: 'production' }
                      ]}
                      size="large"
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    {facets && facets.operations && facets.operations.length ? (
                      <Select
                        id="operation"
                        options={[{ value: 'any', name: 'Any' }].concat(
                          facets.operations.map(({ _id, count }) => ({
                            name: `${_id} (${count})`,
                            value: _id
                          }))
                        )}
                        {...props}
                      >
                        Operation
                      </Select>
                    ) : (
                      <TextField id="operation" {...props}>
                        Operation
                      </TextField>
                    )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    {facets && facets.modules && facets.modules.length ? (
                      <Select
                        id="module"
                        options={[{ value: 'any', name: 'Any' }].concat(
                          facets.modules.map(({ _id, count }) => ({
                            name: `${_id} (${count})`,
                            value: _id
                          }))
                        )}
                        {...props}
                      >
                        Module
                      </Select>
                    ) : (
                      <TextField id="module" {...props}>
                        Module
                      </TextField>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      style={{ paddingTop: 20 }}
                      color="textSecondary"
                      variant="h5"
                    >
                      User
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField id="user" {...props}>
                      User
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField id="ip" {...props}>
                      IP
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      style={{ paddingTop: 20 }}
                      color="textSecondary"
                      variant="h5"
                    >
                      Date
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="dateFrom"
                      type="datetime-local"
                      {...props}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="dateTo"
                      type="datetime-local"
                      {...props}
                    ></TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <Actions
                      right={[
                        {
                          children: 'Apply',
                          onClick: handleSubmit,
                          variant: 'contained',
                          color: 'primary',
                          size: 'large'
                        }
                      ]}
                    />
                  </Grid>
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        </form>
      )}
    </Formik>
  )
}

const Logs = () => {
  const router = useRouter()
  const filters = { ...router.query }

  const [sort, setSort] = React.useState()
  const [page, setPage] = React.useState(0)
  const { traces, hasMore, loading } = useTraces({
    page,
    sort,
    size: 12,
    ...filters
  })

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box flexGrow={1}>
          <Title overtitle="Audition">Log activity</Title>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <LogTable
          head={
            <Filter
              filters={filters}
              onChange={(query) => {
                router.replace({ query })
              }}
            />
          }
          sort={sort}
          onSortChange={setSort}
          onPageChange={setPage}
          hasMore={hasMore}
          page={page}
          traces={traces}
          loading={loading}
        />
      </Grid>
    </Grid>
  )
}

export default Logs
