/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react'
import Togglable from './Togglable'

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
}

const Blog = ({ blog, handleLikes, handleDelete }) => (
    <div id='divData' className='divData' style={blogStyle}>
        <b>Title:</b> {blog.title} <br></br>
        <b>Author:</b> {blog.author} <br></br>
        <Togglable buttonLabel="Extend" >
            <b>Likes:</b> <span className='spanLikes'> {blog.likes} </span> <button id='buttonLike' onClick={handleLikes}>like</button> <br></br>
            <b>Url:</b> {blog.url} <br></br>
            <button value={ blog.id } onClick={ handleDelete } >Delete</button><br></br>
        </Togglable>

    </div>
)

export default Blog