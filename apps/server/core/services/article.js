const { gql, ApolloError } = require('apollo-server')
const ms = require('../..')
const Article = ms.getModel('Article')
const PAGE_SIZE = ms.config.get('settings.app.articles.pageSize') || 6
const typeDefs = gql`
  extend type Query {
    articles(offset: Int, sort: String, size: Int): [Article]
    article(_id: ID!): Article
  }

  extend type Mutation {
    insertArticle(
      title: String
      body: String
      date: Date
      images: [String]
    ): Article @auth
    updateArticle(
      _id: ID!
      title: String
      body: String
      date: Date
      images: [String]
    ): Article @auth
    removeArticle(_id: ID!): Article @auth
  }

  type Article {
    _id: ID
    title: String
    body: String
    date: Date
    images: [String]
  }
`

const resolvers = {
  Query: {
    articles: (_, { offset = 0, sort = '-date', size = PAGE_SIZE }) =>
      Article.find().sort(sort).skip(offset).limit(size).exec(),
    article: (_, { _id }) => Article.findOne({}).sort('-date').exec()
  },
  Mutation: {
    insertArticle: (_, article) => new Article(article).save(),
    updateArticle: (_, { _id, ...article }) =>
      Article.findOneAndUpdate({ _id }, article, { new: true }).exec(),
    removeArticle: (_, article) => Article.findOneAndRemove(article).exec()
  }
}

module.exports = { typeDefs, resolvers }
