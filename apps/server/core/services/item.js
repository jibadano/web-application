const { gql } = require('apollo-server')
const get = require('lodash/get')
const { model } = require('../..')
const { Product } = model

const typeDefs = gql`
  extend type Query {
    items(items: [ID]!): [Item]
  }

  type Item {
    _id: ID
    name: String
    image: String
    currency: String
    price: Int
  }
`

const resolvers = {
  Query: {
    items: (_, { items }) =>
      Product.find({
        _id: {
          $in: items.map((itemId) => itemId.split('/')[0])
        }
      }).then((products) =>
        items.map((itemId) => {
          const ids = itemId.split('/')
          const _id = ids[0]
          const variant_id = ids[1]
          const product = products.find((product) => _id == product._id)
          const variant = product.variants.find(
            (variant) => variant_id == variant._id
          )

          return {
            _id: itemId,
            name: product.name.es,
            image: get(variant, 'images.0'),
            price: get(variant, 'pricing.price'),
            currency: get(variant, 'pricing.currency')
          }
        })
      )
  }
}

module.exports = { typeDefs, resolvers }
