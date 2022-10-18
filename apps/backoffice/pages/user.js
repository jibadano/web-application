import React from 'react'
import { useRouter } from 'next/router'
import { useCredentials, useRole } from '@backoffice/components/auth/hooks'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Title from '@backoffice/components/common/title'
import DataTable from '@backoffice/components/common/data/table'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import UserProfile from '@backoffice/components/user/profile'
import User from '@backoffice/components/user'
import UserNew from '@backoffice/components/user/new'

const Users = () => {
  const router = useRouter()
  const [selected, setSelected] = React.useState()
  const [create, setCreate] = React.useState()
  const { credentials, loading } = useCredentials()
  const role = useRole()

  React.useEffect(() => {
    setSelected(router && router.query._id)
  }, [router && router.query._id])

  return (
    <>
      <Title
        overtitle={
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Overview
            </Link>
            <Typography color="textPrimary"></Typography>
          </Breadcrumbs>
        }
        actions={
          role == 'ADMIN' && (
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={() => {
                setSelected()
                setCreate(true)
                router.replace({ query: {} })
              }}
            >
              New user
            </Button>
          )
        }
      >
        Users
      </Title>
      <Box my={4}>
        {selected && !create && (
          <User
            _id={selected}
            onDone={() => {
              setSelected()
              router.replace({ query: {} })
            }}
          />
        )}
        {create && <UserNew onDone={() => setCreate()} />}
        {!selected && !create && (
          <DataTable
            config={[
              {
                title: 'Name'
              },
              {
                title: 'User',
                _id: '_id'
              },
              {
                title: 'Role'
              },
              { title: 'Created at', _id: 'createdAt' }
            ]}
            rows={credentials.map(({ _id, role, createdAt }) => ({
              values: [
                <UserProfile _id={_id} />,
                _id,
                role,
                new Date(createdAt).toLocaleDateString()
              ],
              _id,
              onClick: () => {
                setSelected(_id)
                setCreate()
                router.replace({ query: { _id } })
              }
            }))}
            loading={loading}
          />
        )}
      </Box>
    </>
  )
}

export default Users
