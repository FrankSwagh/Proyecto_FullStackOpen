/*eslint linebreak-style: ["error", "windows"]*/
import React, { useState } from 'react'

const AddBlog = ({ agregarBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthor = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrl = (event) => {
        setUrl(event.target.value)
    }

    const handlePress = (event) => {
        event.preventDefault()

        const newBlog = {
            title,
            author,
            url
        }

        agregarBlog(newBlog)
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <div className='formDiv'>
            <h1>Create new blog</h1>
            <form onSubmit={handlePress}>
                <div>
          title: <input id='title' value={title} onChange={handleTitle} />
                </div>
                <div>
          author: <input id='author' value={author} onChange={handleAuthor}  />
                </div>
                <div>
          url: <input id='url' value={url} onChange={handleUrl}  />
                </div>
                <div>
                    <button id='createButton' type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}


export default AddBlog
