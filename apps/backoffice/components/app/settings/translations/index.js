import React from 'react'
import { useRouter } from 'next/router'
import { useTranslations } from '../hooks'
import get from 'lodash/get'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import LanguageIcon from '@mui/icons-material/LanguageOutlined'

import Loading from '@backoffice/components/app/loading'
import SideMenu from '@backoffice/components/app/sideMenu'

import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListField from 'form/listField'
import Select from 'form/select'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Actions from '@backoffice/components/app/actions'

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
} from '@backoffice/components/app/settings/hooks'

const Translations = (props) => {
  const router = useRouter()

  const [selected, setSelected] = React.useState()
  const [searchText, setSearchText] = React.useState(
    router.query.searchText || ''
  )

  const { translations, loading } = useTranslations()
  const [updateSettings, { loading: refreshing }] = useUpdateSettings()

  const formik = useFormik({
    initialValues: {},
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      i18next: Yup.object().shape({
        fallbackLng: Yup.string().nullable(),
        whitelist: Yup.array().of(Yup.string()),
        keySeparator: Yup.boolean().nullable()
      })
    }),
    onSubmit: (settings, { resetForm }) => {
      updateSettings({ variables: { settings } }).then(() =>
        resetForm(settings)
      )
    }
  })
  const { settings, loading: settingsLoading } = useSettings()

  React.useEffect(() => {
    formik.setValues(settings)
  }, [settingsLoading])

  if (settingsLoading) return <Loading />

  if (loading) return <Loading />

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Fade in={selected} unmountOnExit mountOnEnter>
          <div>
            <Translation
              key={selected && selected.key}
              onDone={(newTranslation) => setSelected(newTranslation)}
              translation={selected}
            />
          </div>
        </Fade>
        {!selected && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="50vh"
          >
            <Typography color="textSecondary" variant="h5">
              <LanguageIcon fontSize="small" /> Select a translation key to edit
            </Typography>
          </Box>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <SideMenu title="Translations list">
          <Paper
            style={{
              maxHeight: '80vh',
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
          >
            <List>
              <ListSubheader disableGutters>
                <Box p={2} style={{ backgroundColor: 'white' }}>
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
          </Paper>
        </SideMenu>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ maxWidth: 'sm', display: 'grid', gap: 3 }}>
          <Typography variant="h5">I18Next</Typography>
          <ListField id="i18next.whitelist" {...formik}>
            Languages
          </ListField>
          <Select
            id="i18next.fallbackLng"
            options={(get(formik, 'values.i18next.whitelist') || []).map(
              (value) => ({ name: value, value })
            )}
            {...formik}
          >
            Default language
          </Select>
          <Actions
            left={[
              {
                disabled: !formik.dirty,
                children: 'Save',
                onClick: formik.handleSubmit,
                variant: 'contained',
                color: 'primary'
              }
            ]}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Translations
