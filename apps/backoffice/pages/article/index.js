import React from 'react'
import { useTranslation } from 'lib/i18next'
import { useRouter } from 'next/router'
import { useArticles } from '@backoffice/components/article/hooks'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Avatar from '@mui/material/Avatar'

import DataTable from '@backoffice/components/common/data/table'
import Title from '@backoffice/components/common/title'
import FormattedDate from '@backoffice/components/common/formattedDate'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { scaleImage } from 'lib/utils'

const Articles = () => {
  const { t } = useTranslation()
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
                {t('backoffice.overview')}
              </Link>

              <Typography color="textPrimary"></Typography>
            </Breadcrumbs>
          }
          actions={
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={() => router.push(`article/new`)}
            >
              {t('backoffice.article.new')}
            </Button>
          }
        >
          {t('backoffice.articles')}
        </Title>
      </Box>
      <DataTable
        config={[
          { props: { align: 'right' } },
          {
            title: t('backoffice.article.title'),
            _id: 'title'
          },
          {
            title: t('backoffice.article.date'),
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
            <FormattedDate value={date} />
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
