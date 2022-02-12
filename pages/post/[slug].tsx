import Head from 'next/head'
import { useRouter } from 'next/router';
import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  Loader,
  PostDetail,
  PostWidget,
} from '../../components'
import { getPostDetails, getPosts } from '../../services'

const PostDetails = ({ post }:{post: any}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
    
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
      <title>Lilian's Blog - {post.title}</title>
      </Head>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post}/>
          <Author author={post.author}/>
          <CommentsForm slug={post.slug}/>
          <Comments slug={post.slug}/>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget 
            slug={post.slug}
            categories={post.categories.map((category: { slug: any }) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails

export async function getStaticProps({ params }: {params: any}) {
  const data = await getPostDetails(params.slug)

  return {
    props: { post: data },
  }
}

export async function getStaticPaths() {
    const posts = await getPosts()

    return {
        paths: posts.map(({node: {slug}}:{node: any}) => ({params: {slug}})),
        fallback: true
    }
}