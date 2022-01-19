import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
  Tab,
  Tabs
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import LaptopMacIcon from '@mui/icons-material/LaptopMac'
import PhoneIcon from '@mui/icons-material/Smartphone'
import TabletIcon from '@mui/icons-material/Tablet'
import InstagramIcon from '@mui/icons-material/Instagram'

import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookIcon from '@mui/icons-material/Facebook'
import { useTraffic } from './hooks'

import CardSkeleton from '@jibadano/backoffice-components/cardSkeleton'
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}))

const getRate = (list, stat, total) => {
  if (!total) return 0
  const s = list.find(({ _id }) => _id == stat)
  if (!s) return 0
  return ((s.count / total) * 100).toFixed(1)
}

const TrafficByDevice = ({ className, ...rest }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [view, setView] = React.useState(0)
  const { data: dataTraffic, loading } = useTraffic()

  const traffic = dataTraffic && dataTraffic.traffic
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
    labels: ['Desktop', 'Mobile', 'Tablet', 'Unknown']
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
    labels: ['Facebook', 'Instagram', 'WhatsApp', 'Unknown']
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
      title: 'Desktop',
      value: getRate(traffic.device, 'desktop', traffic.total),
      icon: LaptopMacIcon,
      color: theme.palette.primary.main
    },

    {
      title: 'Mobile',
      value: getRate(traffic.device, 'mobile', traffic.total),
      icon: PhoneIcon,
      color: theme.palette.secondary.main
    },
    {
      title: 'Tablet',
      value: getRate(traffic.device, 'tablet', traffic.total),
      icon: TabletIcon,
      color: theme.palette.primary.light
    }
  ]

  const listSource = [
    {
      title: 'Facebook',
      value: getRate(traffic.source, 'facebook', traffic.total),
      icon: FacebookIcon,
      color: theme.palette.primary.main
    },
    {
      title: 'Instagram',
      value: getRate(traffic.source, 'instagram', traffic.total),
      icon: InstagramIcon,
      color: theme.palette.secondary.main
    },
    {
      title: 'WhatsApp',
      value: getRate(traffic.source, 'web', traffic.total),
      icon: WhatsAppIcon,
      color: theme.palette.primary.light
    }
  ]

  return (
    <Card {...rest}>
      <CardHeader title="Traffic" />
      <Divider />
      <Tabs
        variant="fullWidth"
        value={view}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e, value) => setView(value)}
      >
        <Tab label="Device" />
        <Tab label="Source" />
      </Tabs>
      {view != 1 ? (
        <CardContent>
          <Box height={300} position="relative">
            <Doughnut data={dataDevice} options={options} />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            {listDevice.map(({ color, icon: Icon, title, value }) => (
              <Box key={title} px={2} textAlign="center">
                <Icon color="action" />
                <Typography color="textPrimary" variant="body1">
                  {title}
                </Typography>
                <Typography style={{ color }} variant="h2">
                  {value}%
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      ) : (
        <CardContent>
          <Box height={300} position="relative">
            <Doughnut data={dataSource} options={options} />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            {listSource.map(({ color, icon: Icon, title, value }) => (
              <Box key={title} px={2} textAlign="center">
                <Icon color="action" />
                <Typography color="textPrimary" variant="body1">
                  {title}
                </Typography>
                <Typography style={{ color }} variant="h2">
                  {value}%
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
