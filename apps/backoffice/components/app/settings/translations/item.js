import React from 'react'
import { makeStyles } from '@mui/styles'
import TextField from '@jibadano/form/textField'
import Actions from '@jibadano/backoffice-components/actions'

import { useTranslation } from 'common-lib/i18next'
import Paper from '@mui/material/Paper'

import { useUpdateTranslation } from '../hooks'
import { Formik } from 'formik'
import * as Yup from 'yup'
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    '& > *': {
      marginBottom: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    }
  },
  button: { float: 'right', margin: theme.spacing(2) },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}))

const Translation = ({ onDone, translation }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [updateTranslation] = useUpdateTranslation()
  return (
    <Paper>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        initialValues={translation}
        validationSchema={Yup.object().shape({
          key: Yup.string().nullable(),
          values: Yup.array().of(
            Yup.object().shape({
              language: Yup.string().nullable(),
              text: Yup.string().nullable()
            })
          )
        })}
        onSubmit={({ key, values }) =>
          updateTranslation({
            variables: { key: translation.key, values }
          }).then(() => onDone({ key, values }))
        }
      >
        {({ handleSubmit, handleReset, dirty, ...props }) => (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className={classes.root}>
              <TextField id="key" disabled {...props}>
                {t('Key')}
              </TextField>
              {props.values &&
                props.values.values &&
                props.values.values.map(({ language }, index) => (
                  <TextField
                    key={index + language}
                    id={`values.${index}.text`}
                    multi
                    rows={2}
                    {...props}
                  >
                    {language}
                  </TextField>
                ))}
              <Actions
                left={[
                  { children: 'Cancel', variant: 'text', onClick: handleReset }
                ]}
                right={[
                  {
                    disabled: !dirty,
                    children: 'Save',
                    variant: 'contained',
                    color: 'primary',
                    onClick: handleSubmit
                  }
                ]}
              />
            </div>
          </form>
        )}
      </Formik>
    </Paper>
  )
}

export default Translation
