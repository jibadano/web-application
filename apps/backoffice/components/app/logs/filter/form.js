import React from 'react'
import { Grid, Box } from '@mui/material'
import { useTraceFacets } from '@backoffice/components/app/logs/hooks'

import { useFormik, Form } from 'formik'

import Actions from '@backoffice/components/app/actions'
import Loading from '@backoffice/components/app/loading'

import TextField from 'form/textField'
import Toggle from 'form/toggle'
import Select from 'form/select'
import Date from 'form/date'

const LogFilterForm = ({ onChange = () => {}, filters }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: filters,
    onSubmit: (values) => onChange(values)
  })
  const { traceFacets, loading } = useTraceFacets()
  const modules = traceFacets && traceFacets.modules
  const operations = traceFacets && traceFacets.operations
  console.log(formik.values)
  if (loading) return <Loading />

  return (
    <Box sx={{ my: 2 }}>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField size="small" id="message" {...formik}>
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
            {modules ? (
              <Select
                size="small"
                id="module"
                options={[{}].concat(
                  modules.map(({ _id, count }) => ({
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
            {operations ? (
              <Select
                size="small"
                id="operation"
                options={[{}].concat(
                  operations.map(({ _id, count }) => ({
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
            <TextField placeholder="127.0.0.1" size="small" id="ip" {...formik}>
              IP
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <Date size="small" id="dateFrom" type="datetime-local" {...formik}>
              Date from
            </Date>
          </Grid>
          <Grid item xs={12} md={3}>
            <Date size="small" id="dateTo" type="datetime-local" {...formik}>
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
      </form>
    </Box>
  )
}

export default LogFilterForm
