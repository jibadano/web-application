import React from 'react'
import { useRouter } from 'next/router'
import get from 'lodash/get'
import Grid from '@mui/material/Grid'
import { useCredentials, useRole } from '@backoffice/components/app/auth/hooks'
import { useUser, useMe } from '@backoffice/components/app/user/hooks'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

import Title from '@backoffice/components/app/title'
import DataTable from '@backoffice/components/app/dataTable'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'

import UserProfile from '@backoffice/components/app/user/profile'
import User from '@backoffice/components/app/user'
import UserNew from '@backoffice/components/app/user/new'
import UserSecurity from '@backoffice/components/app/user/security'
import UserEdit from '@backoffice/components/app/user/edit'

const Users = () => {
  const router = useRouter()
  const [edit, setEdit] = React.useState()
  const [security, setSecurity] = React.useState()
  const [selected, setSelected] = React.useState(router && router.query._id)
  const [create, setCreate] = React.useState()
  const role = useRole()
  const { credentials, loading } = useCredentials()
  const { user, loading: loadingUser } = useUser(selected)
  const { me, loading: loadingMe } = useMe()

  const currentUser = get(me, '_id') == get(user, '_id')

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
        {selected && (
          <Box>
            {edit && !security && (
              <UserEdit
                onDone={() => setEdit()}
                role={role}
                currentUser={currentUser}
                _id={selected}
                {...user}
              />
            )}
            {!edit && !security && (
              <User
                {...user}
                role={role}
                currentUser={currentUser}
                onDone={() => setSelected()}
                onEdit={() => setEdit(true)}
                onSecurity={() => {
                  setEdit()
                  setSecurity(true)
                }}
              />
            )}

            {security && !edit && (
              <UserSecurity
                {...user}
                role={role}
                currentUser={currentUser}
                onDone={() => setSecurity()}
              />
            )}
          </Box>
        )}
        {create && !selected && <UserNew onDone={() => setCreate()} />}
        {!selected && !create && !edit && (
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
                setEdit()
                setSecurity()
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
