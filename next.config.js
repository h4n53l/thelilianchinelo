/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    GraphCMS_API: process.env.GraphCMS_API,
    GraphCMS_Token: process.env.GraphCMS_Token,

  }
}
