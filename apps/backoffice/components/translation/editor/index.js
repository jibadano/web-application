import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'lib/i18next'

import { useTranslations } from '../../settings/hooks'
import get from 'lodash/get'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import LanguageIcon from '@mui/icons-material/LanguageOutlined'

import Loading from '@backoffice/components/common/card/skeleton'
import SideMenu from '@backoffice/components/common/sideMenu'

import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

import Typography from '@mui/material/Typography'

import Paper from '@mui/material/Paper'
import TextField from 'form/textField'
import ListSubheader from '@mui/material/ListSubheader'
import Fade from '@mui/material/Fade'
import Translation from './item'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  useSettings,
  useUpdateSettings
} from '@backoffice/components/settings/hooks'

const Translations = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [selected, setSelected] = React.useState()
  const [searchText, setSearchText] = React.useState(
    router.query.searchText || ''
  )

  let { translations, loading } = useTranslations()
  const [updateSettings, { loading: refreshing }] = useUpdateSettings()

  const { settings, loading: settingsLoading } = useSettings()

  const formik = useFormik({
    initialValues: settings,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      i18next: Yup.object().shape({
        fallbackLng: Yup.string().nullable(),
        whitelist: Yup.array().of(Yup.string()),
        keySeparator: Yup.boolean().nullable()
      })
    }),
    onSubmit: (settings, { resetForm }) => {
      updateSettings({ variables: { settings } })
    }
  })

  if (settingsLoading || loading) return <Loading />

  return (
    <Box component={Paper} sx={{ display: 'flex' }}>
      <Box
        style={{
          maxHeight: '80vh',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <SideMenu title={t('backoffice.translations.list')}>
          <List>
            <ListSubheader style={{ borderRadius: 20 }} disableGutters>
              <Box p={2} style={{ borderRadius: 20, backgroundColor: 'white' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={searchText}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setSearchText(e.target.value)}
                  label={t('backoffice.search')}
                ></TextField>
              </Box>
            </ListSubheader>
            {translations
              .filter(({ key }) => new RegExp(`.*${searchText}.*`).test(key))
              .map((translation) => {
                const missing = translation.values.some(
                  ({ text }) => !Boolean(text)
                )
                return (
                  <ListItem
                    key={translation.key}
                    button
                    selected={selected && translation.key == selected.key}
                    onClick={() => setSelected(translation)}
                  >
                    <ListItemText primary={translation.key} />

                    {missing && (
                      <ListItemSecondaryAction>
                        <Chip
                          label={t('backoffice.translations.untranslated')}
                        />
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                )
              })}
          </List>
        </SideMenu>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Fade in={selected} unmountOnExit mountOnEnter>
          <div>
            <Translation
              key={selected && selected.key}
              onDone={(newTranslation) => setSelected(newTranslation)}
              translation={selected}
              languages={get(formik, 'values.i18next.whitelist') || []}
            />
          </div>
        </Fade>
        {!selected && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: '50vh'
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              sx={{
                textAlign: 'center'
              }}
            >
              <LanguageIcon fontSize="medium" />
              <Typography color="textSecondary" variant="h5">
                {t('backoffice.translations.select')}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Translations
