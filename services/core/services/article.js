const { gql } = require('apollo-server')

module.exports = (ms) => {
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
      articles: (
        _,
        {
          offset = 0,
          sort = '-date',
          size = ms.config.get('..settings.app.articles.pageSize') || 6
        }
      ) => ms.model.Article.find().sort(sort).skip(offset).limit(size).exec(),
      article: (_, { _id }) => ms.model.Article.findOne({}).sort('-date').exec()
    },
    Mutation: {
      insertArticle: (_, article) => new ms.model.Article(article).save(),
      updateArticle: (_, { _id, ...article }) =>
        ms.model.Article.findOneAndUpdate({ _id }, article, {
          new: true
        }).exec(),
      removeArticle: (_, article) =>
        ms.model.Article.findOneAndRemove(article).exec()
    }
  }

  return { typeDefs, resolvers }
}
