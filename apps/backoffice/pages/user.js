import React from 'react'
import { useTranslation } from 'lib/i18next'
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
import FormattedDate from '@backoffice/components/common/formattedDate'

const Users = () => {
  const router = useRouter()
  const { t } = useTranslation()

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
              {t('backoffice.dashboard')}
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
              {t('backoffice.user.new')}
            </Button>
          )
        }
      >
        {t('backoffice.users')}
      </Title>
      <Box my={4}>
        <Box sx={{ maxWidth: 'sm' }}>
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
        </Box>
        {!selected && !create && (
          <DataTable
            config={[
              {
                title: t('backoffice.user.name')
              },
              {
                title: t('backoffice.user'),
                _id: '_id'
              },
              {
                title: t('backoffice.user.role')
              },
              { title: t('backoffice.user.createdAt'), _id: 'createdAt' }
            ]}
            rows={credentials.map(({ _id, role, createdAt }) => ({
              values: [
                <UserProfile _id={_id} />,
                _id,
                role,
                <FormattedDate value={createdAt} />
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
