import React from 'react'
import { useRouter } from 'next/router'
import { useTranslations } from '../../settings/hooks'
import get from 'lodash/get'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import LanguageIcon from '@mui/icons-material/LanguageOutlined'

import Loading from '@backoffice/components/common/loading'
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

const Translations = (props) => {
  const router = useRouter()
  const [edit, setEdit] = React.useState()

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

  if (settingsLoading) return <Loading />

  if (loading) return <Loading />

  formik.disabled = !edit
  return (
    <Box component={Paper} sx={{ display: 'flex', maxWidth: 'md' }}>
      <Box
        style={{
          maxHeight: '80vh',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <SideMenu title="Translations list">
          <List>
            <ListSubheader style={{ borderRadius: 20 }} disableGutters>
              <Box p={2} style={{ borderRadius: 20, backgroundColor: 'white' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={searchText}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setSearchText(e.target.value)}
                  label="Search"
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
                        <Chip label="Untranslated" />
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
              <LanguageIcon fontSize="large" />
              <Typography color="textSecondary" variant="h4">
                Select a translation key to edit
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Translations
