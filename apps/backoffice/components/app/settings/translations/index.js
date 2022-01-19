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

import Loading from '@jibadano/backoffice-components/loading'
import SideMenu from '@jibadano/backoffice-components/sideMenu'
import DataList from '@jibadano/backoffice-components/dataList'
import DataListItem from '@jibadano/backoffice-components/dataListItem'

import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListField from '@jibadano/form/listField'
import Select from '@jibadano/form/select'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Paper from '@mui/material/Paper'
import TextField from '@jibadano/form/textField'
import ListSubheader from '@mui/material/ListSubheader'
import Fade from '@mui/material/Fade'
import Translation from './item'

const Translations = (props) => {
  const router = useRouter()

  const [selected, setSelected] = React.useState()
  const [searchText, setSearchText] = React.useState(
    router.query.searchText || ''
  )

  const { translations, loading } = useTranslations()
  if (loading) return <Loading />

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
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
      <Grid item xs={12} md={6}>
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
      <Grid item xs={12} md={3}>
        <DataList title="I18Next">
          <DataListItem
            label="Languages"
            primary={<ListField id="i18next.whitelist" {...props} />}
          />
          <DataListItem
            label="Default Language"
            primary={
              <Select
                id="i18next.fallbackLng"
                options={(get(props, 'values.i18next.whitelist') || []).map(
                  (value) => ({ name: value, value })
                )}
                {...props}
              />
            }
          />
        </DataList>
      </Grid>
    </Grid>
  )
}

export default Translations
