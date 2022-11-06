import React from 'react'
import TextField from 'form/textField'
import Actions from '@backoffice/components/common/actions'
import Box from '@mui/material/Box'
import { useTranslation } from 'lib/i18next'

import { useUpdateTranslation } from '../hooks'
import { Formik } from 'formik'
import * as Yup from 'yup'

const Translation = ({ onDone, languages, translation }) => {
  const { t } = useTranslation()
  const [updateTranslation] = useUpdateTranslation()
  return (
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
          <Box sx={{ p: 4, display: 'grid', gap: 3, width: '100%' }}>
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
                {
                  children: dirty ? 'Cancel' : 'Back',
                  variant: 'text',
                  onClick: () => {
                    handleReset()
                    onDone()
                  }
                }
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
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Translation
