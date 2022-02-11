import { request, gql } from "graphql-request";

const GraphQL_API: string = process.env.GraphQL_API
  ? process.env.GraphQL_API
  : "";

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
  `;
  const results = await request(GraphQL_API, query);

  return results.postsConnection.edges;
};

export const getPostDetails = async (slug: String) => {
  const query = gql`
  query GetPostDetails ($slug: String!) {
    post(where: { slug: $slug}) {
      title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
          }
        }
    
  `;
  const results = await request(GraphQL_API, query, { slug });

  return results.post;
};

export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails(){
    posts(
      orderBy: createdAt_ASC
      last: 3
    )
    {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
  `;
  const results = await request(GraphQL_API, query);

  return results.posts;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const results = await request(GraphQL_API, query, { categories, slug });

  return results.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  const results = await request(GraphQL_API, query);

  return results.categories;
};
