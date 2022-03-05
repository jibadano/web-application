import React from 'react'

import Loading from '@backoffice/components/app/loading'
import Title from '@backoffice/components/app/title'
import DataList from '@backoffice/components/app/dataList'
import DataListItem from '@backoffice/components/app/dataListItem'
import ActionsSet from '@backoffice/components/app/actionsSet'
import Actions from '@backoffice/components/app/actions'

import TextField from 'form/textField'
import Box from '@mui/material/Box'

import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  useSettings,
  useUpdateSettings,
  useDeployStatus,
  useStartDeploy
} from '@backoffice/components/app/settings/hooks'
import TranslationsSettings from '@backoffice/components/app/settings/translations'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Container from '@mui/material/Container'

import Deployments from '@backoffice/components/app/settings/deployments'

import Badge from '@mui/material/Badge'

const Settings = () => {
  const [nav, setNav] = React.useState(0)
  const [updateSettings, { loading: refreshing }] = useUpdateSettings()
  const { settings, loading } = useSettings()
  const [startDeploy] = useStartDeploy()
  const { deployStatus, loading: deployStatusLoading } = useDeployStatus()
  if (loading) return <Loading />

  return (
    <Formik
      validateOnBlur={true}
      validateOnChange={false}
      initialValues={settings}
      validationSchema={Yup.object().shape({
        app: Yup.object().shape({
          name: Yup.string().required()
        }),
        contact: Yup.object().shape({
          phone: Yup.string().required(),
          email: Yup.string().required(),
          address: Yup.string()
        }),
        i18next: Yup.object().shape({
          fallbackLng: Yup.string().nullable(),
          whitelist: Yup.array().of(Yup.string()),
          keySeparator: Yup.boolean().nullable()
        })
      })}
      onSubmit={(settings, { resetForm }) => {
        updateSettings({ variables: { settings } }).then(() =>
          resetForm(settings)
        )
      }}
    >
      {({ handleSubmit, ...props }) => (
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Title overtitle="Configuration">Settings</Title>
          <Container maxWidth="md" style={{ padding: 0 }}>
            <Box my={4}>
              <Tabs
                variant="scrollable"
                value={nav}
                onChange={(e, nav) => setNav(nav)}
              >
                <Tab label="Main" />
                <Tab label="Translations" />
                <Tab
                  label={
                    <Badge
                      badgeContent={deployStatus == 'required' ? 1 : 0}
                      variant="dot"
                      color="secondary"
                    >
                      Deployments
                    </Badge>
                  }
                />
              </Tabs>
            </Box>
          </Container>
          {nav == 0 && (
            <Container maxWidth="md" style={{ padding: 0 }}>
              <DataList title="Brand">
                <DataListItem
                  label="Name"
                  primary={<TextField id="app.name" {...props} />}
                />
              </DataList>
              <Box my={4}>
                <DataList title="Contact">
                  <DataListItem
                    label="E-mail"
                    primary={<TextField id="contact.email" {...props} />}
                  />
                  <DataListItem
                    label="Phone"
                    primary={<TextField id="contact.phone" {...props} />}
                  />
                  <DataListItem
                    label="Address"
                    primary={<TextField id="contact.address" {...props} />}
                  />
                </DataList>
              </Box>
            </Container>
          )}

          {nav == 1 && <TranslationsSettings {...props} />}
          {nav == 2 && (
            <Container maxWidth="md" style={{ padding: 0 }}>
              <Deployments />
            </Container>
          )}
          <Actions
            right={[
              {
                disabled: deployStatus == 'info',
                display: !deployStatusLoading && deployStatus != 'ok',
                children: 'Deploy',
                onClick: () => {
                  startDeploy().then(() => setNav(2))
                },
                variant: 'contained',
                color: 'secondary'
              },
              {
                disabled: !props.dirty,
                children: 'Save',
                variant: 'contained',
                color: 'primary',
                onClick: handleSubmit
              }
            ]}
          />
        </form>
      )}
    </Formik>
  )
}

export default Settings
