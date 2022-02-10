import { useEffect, useState } from "react";
import { getRecentPosts, getSimilarPosts } from "../services";


const PostWidget = ({categories, slug}) => {
    const [relatedPosts, setRelatedPosts] = useState([])

useEffect(() => {
    if(slug) {
        getSimilarPosts(categories, slug)
        .then((results) => {setRelatedPosts(results)})
    } else {
        getRecentPosts()
        .then((results) => {setRelatedPosts(results)})
    }
}, [slug])

    return (
        <div>
            PostWidget
        </div>
    );
}

export default PostWidget;