// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql, GraphQLClient } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const GraphCMS_API = process.env.GraphCMS_API  ? process.env.GraphCMS_API : "";
const GraphCMS_Token = process.env.GraphCMS_Token   ? process.env.GraphCMS_Token : "";

const comments = async(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {

  const graphQLClient = new GraphQLClient(GraphCMS_API, {
    headers: {
      authorization: `Bearer ${GraphCMS_Token}`
    }
  })

  const query = gql`
  mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!){
    createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) {id}
  }
  `
  const results = await graphQLClient.request(query, request.body)

  response.status(200).send(results)
}

export default comments;