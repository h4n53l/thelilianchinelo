import moment from "moment";
import { parse } from "path";
import { useEffect, useState } from "react";
import { getComments } from "../services";
import {comment} from 'postcss'



const Comments = ({ slug }) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
      getComments(slug)
      .then((result) => console.log(result))

    }, [])
    
    return (
        <div>
            {comment.length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
<h3 className="text-xl mb-8 font-semibold border-b pb-4">
{comment.length}
{' '}
Comments
</h3>
{comments.map((comment) => (
<div className="border-b border-gray-100 mb-4 pb-4"
key={comment.createdAt}
>
    <p className="font-semibold">
        <span>
        {comment.name}
        </span>
        {' '}
        on
        {' '}
        {moment(comment.createdAt).format('DD-MMM-YYYY')}
        </p>
        <p className="whitespace-pre-line text-gray-600 w-full">{parse(comment.comment)}</p>
    </div>

))}
                </div>
            )}
        </div>
    );
}

export default Comments;