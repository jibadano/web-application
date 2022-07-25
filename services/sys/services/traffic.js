const { gql } = require('apollo-server')
const moment = require('moment')
const ms = require('@jibadano/microservice')

const typeDefs = gql`
  extend type Query {
    traffic: Traffic @auth
  }

  type Traffic {
    current: Int
    previous: Int
    device: [DeviceStats]
    source: [SourceStats]
    total: Int
  }

  type DeviceStats {
    _id: ID
    count: Int
  }

  type SourceStats {
    _id: ID
    count: Int
  }
`

const resolvers = {
  Query: {
    traffic: async () => {
      const today = moment()
      const firstDayOfCurrentMonth = moment()
        .date(1)
        .hour(0)
        .minute(0)
        .second(0)

      const aMonthAgo = moment().month(today.month() - 1)
      const firstDayFromAMonthAgo = moment()
        .month(today.month() - 1)
        .date(1)
        .hour(0)
        .minute(0)
        .second(0)

      const thisPeriod = await ms.model.Traffic.find({
        date: { $gte: firstDayOfCurrentMonth, $lte: today }
      }).exec()

      const previousPeriod = await ms.model.Traffic.find({
        date: { $gte: firstDayFromAMonthAgo, $lte: aMonthAgo }
      }).exec()

      const source = await ms.model.Traffic.aggregate([
        {
          $group: {
            _id: '$source',
            count: { $sum: 1 }
          }
        }
      ])

      const device = await ms.model.Traffic.aggregate([
        {
          $group: {
            _id: '$device',
            count: { $sum: 1 }
          }
        }
      ])

      return {
        current: thisPeriod.length,
        previous: previousPeriod.length,
        source,
        device,
        total: source.reduce((acc, cur) => acc + cur.count, 0)
      }
    }
  }
}

const getSource = (origin = '') => {
  if (origin.indexOf('utm_source=IGShopping') > -1) return 'instagram'
  if (origin.indexOf('fbclid') > -1) return 'facebook'
  if (origin.indexOf('utm_source=whatsapp') > -1) return 'whatsapp'

  return
}

const post = (req, res) => {
  const { origin, geolocation, ip, isBot, viewport: device } = req.body

  if (isBot) return res.end()

  new ms.model.Traffic({
    ip: ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    source: getSource(origin),
    origin,
    device,
    geolocation
  })
    .save()
    .catch((e) => {
      //do nothing
    })
  res.end()
}

module.exports = { typeDefs, resolvers, post }
