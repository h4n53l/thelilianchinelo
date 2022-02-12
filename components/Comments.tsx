import moment from 'moment'
import  parse  from 'html-react-parser'
import { useEffect, useState } from 'react'
import { getComments } from '../services'
import { Comments } from '../types'




const Comments = ({ slug }: {slug: string}) => {
  const [comments, setComments] = useState<Array<Comments>>([])

  useEffect( () => {
       getComments(slug).then((result) => setComments(result))

    }, [])

  return (
    <div>
      {comments.length > 0 && (
        <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
          <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
            {comments.length} {comments.length > 1 ? 'Comments' : 'Comment'}
          </h3>
          {comments.map((comment) => (
            <div
              className="mb-4 border-b border-gray-100 pb-4"
              key={comment.createdAt}
            >
              <p className="font-semibold">
                <span>{comment.name}</span> on{' '}
                {moment(comment.createdAt).format('DD-MMM-YYYY')}
              </p>
              <p className="w-full whitespace-pre-line text-gray-600">
                {parse(comment.comment)} 
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Comments
