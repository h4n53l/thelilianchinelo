import { request, gql } from "graphql-request";
import { Categories } from "../types";

const GraphCMS_API: string = process.env.GraphCMS_API
  ? process.env.GraphCMS_API
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
  const results = await request(GraphCMS_API, query);

  return results.postsConnection.edges;
};

export const getPostDetails = async (slug: String) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
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
  const results = await request(GraphCMS_API, query, { slug });

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
  const results = await request(GraphCMS_API, query);

  return results.posts;
};

export const getSimilarPosts = async (categories: Categories, slug:string) => {
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
  const results = await request(GraphCMS_API, query, { categories, slug });

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
  const results = await request(GraphCMS_API, query);

  return results.categories;
};

export const submitComment = async (object: { name: string; email: string; comment: any; slug: string; }) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });
  return result.json();
};

export const getComments = async (slug: any) => {
  const query = gql`
  query GetComments ($slug: String!){
    comments(where: {post: {slug: $slug}})
  {
    name
    createdAt
    comment
  }
  }
  `;
  const results = await request(GraphCMS_API, query, { slug });

  return results.comments;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(GraphCMS_API, query);

  return result.posts;
};

export const getCategoryPost = async (slug: string) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
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
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  
  const result = await request(GraphCMS_API, query, { slug });

  return result.postsConnection.edges;
};