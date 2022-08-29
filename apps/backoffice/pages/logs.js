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
import FilterIcon from '@mui/icons-material/FilterList'
import RemoveIcon from '@mui/icons-material/Close'
import { useFormik } from 'formik'

import Loading from '@backoffice/components/app/loading'
import LogTable from '@backoffice/components/app/logTable'
import Title from '@backoffice/components/app/title'
import Actions from '@backoffice/components/app/actions'

import TextField from 'form/textField'
import Toggle from 'form/toggle'
import Select from 'form/select'
import Date from 'form/date'
import LogsFilters from '@backoffice/components/app/logs/filters'
const Logs = () => {
  const router = useRouter()
  const filters = router.query
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
            <LogsFilters />
            /*  <Accordion
                TransitionProps={{ mountOnEnter: true }}
                elevation={0}
                style={{ backgroundColor: 'transparent' }}
              >
                <AccordionSummary>
                  <Actions
                    right={[
                      {
                        display: Boolean(hasFilter),
                        startIcon: <RemoveIcon />,
                        children: 'Clear',
                        onClick: (event) => {
                          router.replace({ query: {} })

                          event.stopPropagation()
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
                  {facetsLoading ? (
                    <Loading />
                  ) : (
                    <Box p={2}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                          <TextField
                            size="small"
                            onClick={(e) => e.stopPropagation()}
                            id="message"
                            {...formik}
                          >
                            Message
                          </TextField>
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
                            {...formik}
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
                            {...formik}
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
                              {...formik}
                            >
                              Module
                            </Select>
                          ) : (
                            <TextField size="small" id="module" {...formik}>
                              Module
                            </TextField>
                          )}
                        </Grid>
                        <Grid item xs={12} md={3}>
                          {facets &&
                          facets.operations &&
                          facets.operations.length ? (
                            <Select
                              size="small"
                              id="operation"
                              options={[{}].concat(
                                facets.operations.map(({ _id, count }) => ({
                                  name: `${_id} (${count})`,
                                  value: _id
                                }))
                              )}
                              {...formik}
                            >
                              Operation
                            </Select>
                          ) : (
                            <TextField size="small" id="operation" {...formik}>
                              Operation
                            </TextField>
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <TextField size="small" id="_id" {...formik}>
                            Trace ID
                          </TextField>
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField size="small" id="user" {...formik}>
                            User
                          </TextField>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            placeholder="127.0.0.1"
                            size="small"
                            id="ip"
                            {...formik}
                          >
                            IP
                          </TextField>
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <Date
                            size="small"
                            id="dateFrom"
                            type="datetime-local"
                            {...formik}
                          >
                            Date from
                          </Date>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Date
                            size="small"
                            id="dateTo"
                            type="datetime-local"
                            {...formik}
                          >
                            Date to
                          </Date>
                        </Grid>

                        <Grid item xs={12}>
                          <Actions
                            right={[
                              {
                                children: 'Apply',
                                onClick: formik.handleSubmit,
                                variant: 'contained',
                                color: 'primary',
                                size: 'large'
                              }
                            ]}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion> */
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
