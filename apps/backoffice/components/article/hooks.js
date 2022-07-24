import { useQuery, useMutation, gql } from '@apollo/client'
import get from 'lodash/get'
import config from '@jibadano/config'
const ARTICLE = gql`
  query article($_id: ID!) {
    article(_id: $_id) {
      _id
      title
      body
      images
      date
    }
  }
`

export const useArticle = (_id) => {
  const { data, ...rest } = useQuery(ARTICLE, {
    variables: {
      _id
    }
  })
  return { article: get(data, 'article'), data, ...rest }
}

const ARTICLES = gql`
  query articles($offset: Int, $size: Int, $sort: String) {
    articles(offset: $offset, size: $size, sort: $sort) {
      _id
      title
      body
      images
      date
    }
  }
`

export const useArticles = ({
  size = config.get('..settings.app.articles.pageSize') || 6,
  page
}) => {
  const { data, ...query } = useQuery(ARTICLES, {
    fetchPolicy: 'no-cache',
    variables: {
      size: size + 1,
      offset: page * size
    }
  })
  const articles = (data && data.articles) || []
  const hasMore = articles.length == size + 1
  return {
    articles: hasMore ? articles.slice(0, -1) : articles,
    hasMore,
    ...query
  }
}

const UPDATE_ARTICLE = gql`
  mutation updateArticle(
    $_id: ID!
    $title: String
    $body: String
    $images: [String]
    $date: Date
  ) {
    updateArticle(
      _id: $_id
      title: $title
      body: $body
      images: $images
      date: $date
    ) {
      _id
      title
      body
      images
      date
    }
  }
`

export const useUpdateArticle = () =>
  useMutation(UPDATE_ARTICLE, {
    update(cache, { data: { updateArticle } }) {
      try {
        cache.writeQuery({
          query: ARTICLE,
          variables: { _id: updateArticle._id },
          data: { article: { ...updateArticle } }
        })

        const { articles } = cache.readQuery({ query: ARTICLES })
        let newArticles = [...articles]
        let index = newArticles.findIndex((c) => c._id == updateArticle._id)
        if (index > -1) newArticles[index] = updateArticle

        cache.writeQuery({
          query: ARTICLES,
          data: { articles: newArticles }
        })
      } catch (e) {}
    }
  })

const INSERT_ARTICLE = gql`
  mutation insertArticle(
    $title: String
    $body: String
    $images: [String]
    $date: Date
  ) {
    insertArticle(title: $title, body: $body, images: $images, date: $date) {
      _id
      title
      body
      images
      date
    }
  }
`

export const useInsertArticle = () =>
  useMutation(INSERT_ARTICLE, {
    update(cache, { data: { insertArticle } }) {
      try {
        const { articles } = cache.readQuery({ query: ARTICLES })

        cache.writeQuery({
          query: ARTICLES,
          data: { articles: [insertArticle, ...articles] }
        })
      } catch (e) {}
    }
  })

const REMOVE_ARTICLE = gql`
  mutation removeArticle($_id: ID!) {
    removeArticle(_id: $_id) {
      _id
      title
      body
      images
      date
    }
  }
`

export const useRemoveArticle = () =>
  useMutation(REMOVE_ARTICLE, {
    update(cache, { data: { removeArticle } }) {
      try {
        const { articles } = cache.readQuery({ query: ARTICLES })
        let newArticles = [...articles]
        let index = newArticles.findIndex((c) => c._id == removeArticle._id)
        if (index > -1) newArticles.splice(index, 1)
        cache.writeQuery({
          query: ARTICLES,
          data: { articles: newArticles }
        })
      } catch (e) {
        console.log(e)
      }
    }
  })
