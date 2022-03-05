import React from 'react'
import { useRouter } from 'next/router'
import { useArticles } from '@backoffice/components/article/hooks'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Avatar from '@mui/material/Avatar'

import DataTable from '@backoffice/components/app/dataTable'
import Title from '@backoffice/components/app/title'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { scaleImage } from 'lib/utils'

const Articles = () => {
  const router = useRouter()

  const [page, setPage] = React.useState(0)
  const { articles, hasMore, loading } = useArticles({
    page
  })

  return (
    <>
      <Box mb={4}>
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
            <Box mr={2}>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                color="primary"
                onClick={() => router.push(`article/new`)}
              >
                New article
              </Button>
            </Box>
          }
        >
          Articles
        </Title>
      </Box>
      <DataTable
        config={[
          { props: { align: 'right' } },
          {
            title: 'Title',
            _id: 'title'
          },
          {
            title: 'Date',
            _id: 'date'
          }
        ]}
        rows={articles.map(({ _id, title, date, images }) => ({
          values: [
            images && images.length && (
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <Avatar
                  imgProps={{ loading: 'lazy' }}
                  style={{ width: 55, height: 55 }}
                  src={scaleImage(images[0], 128)}
                  variant="rounded"
                  alt={title}
                />
              </Box>
            ),
            title,
            new Date(date).toLocaleDateString()
          ],
          _id,
          onClick: () => router.push(`article/${_id}`)
        }))}
        loading={loading}
        page={page}
        onPageChange={setPage}
        hasMore={hasMore}
      />
    </>
  )
}

export default Articles
