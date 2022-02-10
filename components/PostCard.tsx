import moment from 'moment'
import Link from 'next/link'

const PostCard = ({ post }) => {
  console.log(post)
  return (
    <div className="mb-8 rounded-lg bg-white p-0 pb-12 shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-hidden pb-80 shadow-md">
        <img
          className="absolute h-80 w-full rounded-t-lg object-cover object-top shadow-lg lg:rounded-lg"
          src={post.featuredImage.url}
          alt={post.title}
        />
      </div>
      <h1 className="mb-8 cursor-pointer text-center text-3xl font-semibold transition duration-700 hover:text-pink-600">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="mb-8 block w-full items-center justify-center text-center lg:flex">
        <div className="mr-8 mb-4 flex w-full items-center justify-center lg:mb-0 lg:w-auto">
          <img
            className="rounded-full align-middle"
            src={post.author.photo.url}
            alt={post.author.name}
            height="30px"
            width="30px"
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg">
              {post.author.name}
              </p>
        </div>
        <div className="font-medium text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="align-middle">
            {moment(post.createdAt).format('DD-MMM-YYYY')}
        </span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal p-4 lg:px-20 mb-8">
      {post.excerpt}
      </p>
      <div className="text-center">
      <Link 
      href={`/post/${post.slug}`}
      >
      <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
      </span>
      </Link>
    </div>
    </div>
  )
}

export default PostCard
