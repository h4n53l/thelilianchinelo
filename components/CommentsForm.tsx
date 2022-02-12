import { useEffect, useRef, useState } from 'react'
import { submitComment } from '../services'
import { CommentsForm } from '../types'




const CommentsForm = ({ slug }: {slug: string} ) => {
  const [error, setError] = useState<boolean>(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl: any = useRef()
  const nameEl: any = useRef()
  const emailEl: any = useRef()
  const storeDataEl: any = useRef()

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')
  }, [])

  const handleCommentSubmission = () => {
    setError(false)

    const { value: comment } = commentEl.current
    const { value: name } = nameEl.current
    const { value: email } = emailEl.current
    const { checked: storeData } = storeDataEl.current

    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObject: { name: string; email: string; comment: string; slug: string; } = {
      name,
      email,
      comment,
      slug,
    }

    if (storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('email')
    }

    submitComment(commentObject).then(() => {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    })
  }

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        Please Leave a Comment
      </h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          className="focus:ring-gray200 w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none"
          ref={commentEl}
        ></textarea>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <input
          className="focus:ring-gray200 w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none"
          type="text"
          ref={nameEl}
          placeholder="Name"
          name="name"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <input
          className="focus:ring-gray200 w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none"
          type="text"
          ref={emailEl}
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input
            className="w-full p-4 outline-none"
            id="storeData"
            name="storeData"
            ref={storeDataEl}
            value='true'
            type="checkbox"
          />
          <label
            className="ml-2 cursor-pointer text-gray-500"
            htmlFor="storeData"
          >
            Save my Email and Name for next time.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">Sorry, all fields are required.</p>
      )}
      <div className="mt-8">
        <button
          className="ease inline-block cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg text-white transition duration-500 hover:bg-indigo-900"
          type="button"
          onClick={handleCommentSubmission}
        >
          Comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comment submitted for review. Thank you!
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
