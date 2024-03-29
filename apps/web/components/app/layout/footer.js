import React from 'react'
import { useRouter } from 'lib/router'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import Logo from '../brand/logo'
import Copyright from '../brand/copyright'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import WhatsappIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'
import LocationIcon from '@mui/icons-material/LocationOn'

import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import config from '@jibadano/config'
import { useTranslation } from 'lib/i18next'

const Footer = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Box
      component={Paper}
      sx={{
        position: 'relative',
        backgroundColor: 'primary.main',
        color: 'text.primary',
        p: 4,
        pt: 8
      }}
    >
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={5}>
          <Box mx={2} textAlign="center">
            <Logo color="secondary" />
            <Typography color="textPrimary">{t('brand.slogan')}</Typography>
            <Link
              rel="noopener"
              href={`https://instagram.com/${config.get(
                'settings.contact.instagram'
              )}`}
              target="_blank"
            >
              <IconButton>
                <InstagramIcon color="textPrimary" />
              </IconButton>
            </Link>
            <Link
              rel="noopener"
              href={`https://www.facebook.com/${config.get(
                'settings.contact.facebook'
              )}`}
              target="_blank"
            >
              <IconButton>
                <FacebookIcon color="textPrimary" />
              </IconButton>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <List>
            <ListItem>
              <LocationIcon
                color="action"
                fontSize="small"
                style={{ marginRight: 5 }}
              />
              <Typography variant="body1" color="textPrimary">
                {config.get('..settings.contact.address')}
              </Typography>
            </ListItem>
            <ListItem>
              <EmailIcon
                color="action"
                fontSize="small"
                style={{ marginRight: 5 }}
              />
              <Typography variant="body1" color="textPrimary">
                {config.get('..settings.contact.email')}
              </Typography>
            </ListItem>
            <ListItem>
              <WhatsappIcon
                color="action"
                fontSize="small"
                style={{ marginRight: 5 }}
              />
              <Typography variant="body1" color="textPrimary">
                {config.get('..settings.contact.whatsapp')}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={3}>
          <List>
            <ListItem button onClick={() => router.push('/about')}>
              <Typography variant="body1" color="textPrimary">
                {t('about')}
              </Typography>
            </ListItem>

            <ListItem button onClick={() => router.push('/instructors')}>
              <Typography variant="body1" color="textPrimary">
                {t('instructors')}
              </Typography>
            </ListItem>
            <ListItem button onClick={() => router.push('/classes')}>
              <Typography variant="body1" color="textPrimary">
                {t('classes')}
              </Typography>
            </ListItem>
            <ListItem button onClick={() => router.push('/location')}>
              <Typography variant="body1" color="textPrimary">
                {t('location')}
              </Typography>
            </ListItem>
            <ListItem button onClick={() => router.push('/blog')}>
              <Typography variant="body1" color="textPrimary">
                {t('blog')}
              </Typography>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} align="center">
          <Copyright />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Footer
