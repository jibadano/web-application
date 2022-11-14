import 'chart.js/auto'
import React from 'react'
import { useTranslation } from 'lib/i18next'
import { Doughnut } from 'react-chartjs-2'
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Tab,
  Tabs
} from '@mui/material'

import LaptopMacIcon from '@mui/icons-material/LaptopMac'
import PhoneIcon from '@mui/icons-material/Smartphone'
import TabletIcon from '@mui/icons-material/Tablet'
import InstagramIcon from '@mui/icons-material/Instagram'

import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookIcon from '@mui/icons-material/Facebook'
import { useTrafficStats } from './hooks'

import CardSkeleton from '@backoffice/components/common/card/skeleton'

const getRate = (list, stat, total) => {
  if (!total) return 0
  const s = list.find(({ _id }) => _id == stat)
  if (!s) return 0
  return Math.round((s.count / total) * 100)
}

const TrafficByDevice = ({ className, ...rest }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [view, setView] = React.useState(0)
  const { data: dataTraffic, loading } = useTrafficStats()

  const traffic = dataTraffic && dataTraffic.trafficStats
  if (loading) return <CardSkeleton height={'100%'} />
  if (!traffic) return ''
  const dataDevice = {
    datasets: [
      {
        data: [
          getRate(traffic.device, 'desktop', traffic.total),
          getRate(traffic.device, 'mobile', traffic.total),
          getRate(traffic.device, 'tablet', traffic.total),
          getRate(traffic.device, null, traffic.total)
        ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.primary.light,
          theme.palette.grey[300]
        ],
        borderWidth: 8,
        borderColor: 'white',
        hoverBorderColor: 'white'
      }
    ],
    labels: [
      t('backoffice.device.desktop'),
      t('backoffice.device.mobile'),
      t('backoffice.device.tablet'),
      t('backoffice.unknown')
    ]
  }

  const dataSource = {
    datasets: [
      {
        data: [
          getRate(traffic.source, 'facebook', traffic.total),
          getRate(traffic.source, 'instagram', traffic.total),
          getRate(traffic.source, 'whatsapp', traffic.total),
          getRate(traffic.source, null, traffic.total)
        ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.primary.light,
          theme.palette.grey[300]
        ],
        borderWidth: 8,
        borderColor: 'white',
        hoverBorderColor: 'white'
      }
    ],
    labels: [
      t('backoffice.source.facebook'),
      t('backoffice.source.instagram'),
      t('backoffice.source.whatsapp'),
      t('backoffice.unknown')
    ]
  }

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  }

  const listDevice = [
    {
      title: t('backoffice.device.desktop'),
      value: getRate(traffic.device, 'desktop', traffic.total),
      icon: LaptopMacIcon,
      color: theme.palette.primary.main
    },

    {
      title: t('backoffice.device.mobile'),
      value: getRate(traffic.device, 'mobile', traffic.total),
      icon: PhoneIcon,
      color: theme.palette.secondary.main
    },
    {
      title: t('backoffice.device.tablet'),
      value: getRate(traffic.device, 'tablet', traffic.total),
      icon: TabletIcon,
      color: theme.palette.primary.light
    }
  ]

  const listSource = [
    {
      title: t('backoffice.source.facebook'),
      value: getRate(traffic.source, 'facebook', traffic.total),
      icon: FacebookIcon,
      color: theme.palette.primary.main
    },
    {
      title: t('backoffice.source.instagram'),
      value: getRate(traffic.source, 'instagram', traffic.total),
      icon: InstagramIcon,
      color: theme.palette.secondary.main
    },
    {
      title: t('backoffice.source.whatsapp'),
      value: getRate(traffic.source, 'web', traffic.total),
      icon: WhatsAppIcon,
      color: theme.palette.primary.light
    }
  ]

  return (
    <Card {...rest}>
      <Tabs
        variant="fullWidth"
        value={view}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e, value) => setView(value)}
      >
        <Tab label={t('backoffice.device')} />
        <Tab label={t('backoffice.source')} />
      </Tabs>
      {view != 1 ? (
        <CardContent>
          <Box height={240} position="relative">
            <Doughnut data={dataDevice} options={options} />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            {listDevice.map(({ color, icon: Icon, title, value }) => (
              <Box key={title} px={2} textAlign="center">
                <Typography sx={{ color }} variant="h3">
                  {value}
                  <Typography
                    sx={{ position: 'absolute', mt: '10px', ml: '1px' }}
                    variant="caption"
                  >
                    %
                  </Typography>
                </Typography>
                <Typography color="textPrimary" variant="body2">
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Icon color="action" fontSize="10px" /> {title}
                  </Box>
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      ) : (
        <CardContent>
          <Box height={240} position="relative">
            <Doughnut data={dataSource} options={options} />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            {listSource.map(({ color, icon: Icon, title, value }) => (
              <Box key={title} px={2} textAlign="center">
                <Typography sx={{ color }} variant="h3">
                  {value}
                  <Typography
                    sx={{ position: 'absolute', mt: '10px', ml: '1px' }}
                    variant="caption"
                  >
                    %
                  </Typography>
                </Typography>
                <Typography color="textPrimary" variant="body2">
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Icon color="action" fontSize="10px" /> {title}
                  </Box>
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      )}
    </Card>
  )
}

export default TrafficByDevice
