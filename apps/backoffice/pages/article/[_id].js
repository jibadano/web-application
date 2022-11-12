import React from 'react'
import { useTranslation } from 'lib/i18next'
import { useRouter } from 'lib/router'
import TextField from 'form/textField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ImageUpload from 'image/upload'
import Actions from '@backoffice/components/common/actions'
import Title from '@backoffice/components/common/title'
import CardSkeleton from '@backoffice/components/common/card/skeleton'

import config from '@jibadano/config'
import {
  useArticle,
  useUpdateArticle,
  useRemoveArticle,
  useInsertArticle
} from '@backoffice/components/article/hooks'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

const Article = () => {
  const router = useRouter()
  const _id = router.query._id != 'new' && router.query._id

  const { article, loading } = useArticle(_id)
  const { t } = useTranslation()
  const [updateArticle] = useUpdateArticle()
  const [removeArticle] = useRemoveArticle()
  const [insertArticle] = useInsertArticle()

  if (loading) return <CardSkeleton />

  return (
    <>
      <Box mb={4}>
        <Title
          overtitle={
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/">
                {t('backoffice.overview')}
              </Link>

              <Typography color="textPrimary">
                {t('backoffice.article')}
              </Typography>
              <Typography color="textPrimary">{_id || 'New'}</Typography>
            </Breadcrumbs>
          }
        >
          {_id ? t('backoffice.article.edit') : t('backoffice.article.new')}
        </Title>
      </Box>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        initialValues={article || {}}
        validationSchema={Yup.object().shape({
          title: Yup.string().nullable(),
          images: Yup.array().of(Yup.string()),
          body: Yup.string().nullable()
        })}
        onSubmit={(variables) =>
          _id
            ? updateArticle({
                variables
              }).then(() => router.push('/article'))
            : insertArticle({
                variables
              }).then(() => router.push('/article'))
        }
      >
        {({ handleSubmit, handleReset, dirty, ...props }) => (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Box
              sx={{ maxWidth: 'md', display: 'grid', gap: 3, width: '100%' }}
            >
              <ImageUpload
                id="images"
                preview
                multi
                crop={{ aspect: 1 }}
                cloudName={config.get('..services.core.cloudinary.cloud_name')}
                {...props}
              >
                {t('backoffice.article.image')}
              </ImageUpload>
              <TextField id="title" {...props}>
                {t('backoffice.article.title')}
              </TextField>
              <TextField id="body" multi {...props}>
                {t('backoffice.article.body')}
              </TextField>

              <Actions
                left={[
                  {
                    children: t('backoffice.cancel'),
                    variant: 'text',
                    onClick: () => router.back()
                  }
                ]}
                right={[
                  {
                    display: Boolean(_id),
                    children: 'backoffice.remove',
                    variant: 'outlined',
                    color: 'secondary',
                    onClick: () =>
                      removeArticle(_id).then(() => router.push('/article'))
                  },
                  {
                    children: _id ? 'backoffice.save' : 'backoffice.publish',
                    variant: 'contained',
                    color: 'primary',
                    onClick: handleSubmit
                  }
                ]}
              />
            </Box>
          </form>
        )}
      </Formik>
    </>
  )
}

export default Article
