import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getRecentPosts, getSimilarPosts } from "../services";
import { Categories, Post } from "../types";


const PostWidget = ({categories, slug}: {categories: Categories, slug: string | null}) => {
    const [relatedPosts, setRelatedPosts] = useState([])

useEffect(() => {
    if(slug != null) {
        getSimilarPosts(categories, slug)
        .then((results) => {setRelatedPosts(results)})
    } else {
        getRecentPosts()
        .then((results) => {setRelatedPosts(results)})
    }
}, [slug])


    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {slug ? 'Related Posts' : "Recent Posts"}
                </h3>
                {relatedPosts.map((post: Post) => (
                    <div 
                    key={post.title} 
                    className="flex items-center w-full mb-4"
                    >
                        <div className="w-16 flex-none">
                            <img 
                            className="align-middle rounded-full"
                            src={post.featuredImage.url}
                            alt={post.title}
                            height="60px"
                            width="60px"
                            />
                        </div>
                        <div className="flex-grow ml-4">
                            <p className="text-gray-500 font-xs">
                                {moment(post.createdAt).format('DD-MMM-YYYY')}
                            </p>
                            <div className="text-md">
                            <Link 
                            key={post.title}
                            href={`/post/${post.slug}`}
                            >
                                {post.title}
                            </Link>
                        </div>
                        </div>
                        </div>
                ))}
        </div>
    );
}

export default PostWidget;