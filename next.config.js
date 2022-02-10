/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    GraphQL_API: process.env.GraphQL_API,
  }
}
