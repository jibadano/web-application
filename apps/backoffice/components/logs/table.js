import React from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import DataTable from '@backoffice/components/common/data/table'
import Typography from '@mui/material/Typography'
import LogIcon from '@mui/icons-material/Subject'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import { useTraces } from './hooks'

import LogsFilter from './filter'
import LogData from './data'

const LogTable = () => {
  const router = useRouter()
  const [data, setData] = React.useState()
  const [sort, setSort] = React.useState()
  const [page, setPage] = React.useState(0)
  const [filters, setFilters] = React.useState({})
  const { traces, hasMore, loading } = useTraces({
    page,
    sort,
    size: 12,
    ...filters
  })

  React.useEffect(() => {
    setFilters(router.query)
  }, [router.query])

  const onChange = (filters) => {
    setFilters(filters)
    router.replace({ query: filters })
  }

  return (
    <>
      <LogData data={data} onClose={() => setData()} />
      <DataTable
        size="small"
        loading={loading}
        head={<LogsFilter filters={filters} onChange={onChange} />}
        sort={sort}
        onSortChange={setSort}
        page={page}
        onPageChange={setPage}
        hasMore={hasMore}
        config={[
          { title: 'Date', _id: 'date', sortable: true },
          { title: 'Type' },
          {
            title: 'Message'
          },
          {
            title: 'Operation'
          },
          {
            title: 'User'
          },
          {
            title: 'IP'
          },
          {
            title: 'Module'
          },
          {
            title: ''
          }
        ]}
        rows={traces.reduce(
          (acc, { _id, operation, logs, module, ip, user }) => {
            const l = logs.map((log) => ({
              values: [
                <Typography variant="caption">
                  {moment(log.timestamp).utc().format('YYYY-MM-DD HH:mm:ss')}
                </Typography>,
                <Chip
                  onClick={() => onChange({ ...filters, type: log.type })}
                  label={log.type}
                  color={log.type}
                  variant="outlined"
                  size="small"
                />,
                <Typography
                  onClick={() =>
                    setFilters({
                      ...filters,
                      message: log.message
                    })
                  }
                  variant="body1"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {log.message}
                </Typography>,
                <Typography
                  onClick={() => onChange({ ...filters, operation })}
                  variant="body1"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      marginRight: 10,
                      borderRadius: 300,
                      backgroundColor: `#${_id.slice(0, 6)}`
                    }}
                  />
                  {operation}
                </Typography>,
                <Typography
                  onClick={() => onChange({ ...filters, user })}
                  variant="caption"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {user}
                </Typography>,
                <Typography
                  variant="caption"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => onChange({ ...filters, ip })}
                >
                  {ip}
                </Typography>,
                <Chip
                  onClick={() => onChange({ ...filters, module })}
                  label={module}
                  color="primary"
                  size="small"
                />,
                <IconButton
                  size="small"
                  disabled={!Boolean(log.data)}
                  onClick={() => setData(log)}
                >
                  <LogIcon />
                </IconButton>
              ],
              _id: log._id
            }))
            return acc.concat(l.reverse())
          },
          []
        )}
      />
    </>
  )
}

export default LogTable
