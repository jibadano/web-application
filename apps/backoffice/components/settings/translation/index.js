import React from 'react'

import Grid from '@mui/material/Grid'
import TranslationEditor from './editor'
import TranslationLanguages from './languages'

const TranslationSettings = () => (
  <Grid container>
    <Grid item xs={12} sm={9}>
      <TranslationEditor />
    </Grid>
    <Grid item xs={12} sm={3}>
      <TranslationLanguages />
    </Grid>
  </Grid>
)

export default TranslationSettings
