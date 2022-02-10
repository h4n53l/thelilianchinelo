import {request, gql} from "graphql-request"

const GraphQL_API: string = (process.env.GraphQL_API) ? process.env.GraphQL_API : ""

export const getPosts = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                name
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
            }
          }
        }
      }
      
    `
    const results = await request(GraphQL_API, query)

    return results.postsConnection.edges;
}