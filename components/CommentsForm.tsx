import { useEffect, useRef, useState } from "react";
import { submitComment } from "../services";

const CommentsForm = ({slug}) => {
    const [error, setError] = useState(false)
    const [localStorage, setLocalStorage] = useState(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const commentEl = useRef()
    const nameEl = useRef()
    const emailEl = useRef()
    const storeDataEl = useRef()
    const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false });

    useEffect(() => {
      nameEl.current.value = window.localStorage.getItem('name')
      emailEl.current.value = window.localStorage.getItem('email')
    

    }, [])

const handleCommentSubmission = () => {
    setError(false)

    const {value: comment} = commentEl.current
    const {value: name} = nameEl.current
    const {value: email} = emailEl.current
    const {checked: storeData} = storeDataEl.current

    if(!comment || !name || !email){
        setError(true)
        return
    }

    const commentObject = {
        name, email, comment, slug
    }

    if(storeData) {
        window.localStorage.setItem('name', name)
        window.localStorage.setItem('email', email)
    } else {
        window.localStorage.removeItem('name', name)
        window.localStorage.removeItem('email', email)
    }

    submitComment(commentObject)
    .then(() => {
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000)
    })
}


    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
Please Leave a Comment
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
<textarea 
className="p-4 outline-none w-full rounded-lg focus:ring-gray200 bg-gray-100 text-gray-700"
ref={commentEl}
>

</textarea>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
<input
className="p-4 outline-none w-full rounded-lg focus:ring-gray200 bg-gray-100 text-gray-700"
type="text"
ref={nameEl}
placeholder="Name"
name="name"
/>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
            <input
className="p-4 outline-none w-full rounded-lg focus:ring-gray200 bg-gray-100 text-gray-700"
type="text"
ref={emailEl}
placeholder="Email"
name="email"
/>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input 
                    className="p-4 outline-none w-full"
                    id="storeData"
                    name="storeData"
                    ref={storeDataEl}
                    value={true}
                    type="checkbox"

                    />
                    <label className="text-gray-500 cursor-pointer ml-2"
                    htmlFor="storeData"
                    >
                        Save my Email and Name for next time.
                    </label>
                </div>
            </div>
            {error && 
            <p className="text-xs text-red-500">
Sorry, all fields are required.
            </p>
            }
            <div className="mt-8">
                <button
                className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                type="button"
                onClick={handleCommentSubmission}
                >
Comment
                </button>
                {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review. Thank you!</span>}

                </div>
        </div>
    );
}

export default CommentsForm;