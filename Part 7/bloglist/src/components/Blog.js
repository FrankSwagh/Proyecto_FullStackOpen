/* eslint-disable react/no-unknown-property */
/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BorrarBlog, addLike, addComment } from '../reducers/blogReducer'
import { addMessage } from '../reducers/notificationReducer'
import { useField } from '../Hooks/index'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const Blog = ({ blog }) => {
    const blogs = useSelector((state) => state.blogs)
    const dispatch = useDispatch()
    const comments = useField('text')

    const likeButton = (id) => {
        const likedBlog = blogs.find((blog) => blog.id === id)
        dispatch(addMessage(`You liked ${likedBlog.title}`, 4000))
        dispatch(addLike(likedBlog))
    }

    const deleteButton = (id) => {
        dispatch(BorrarBlog(id))
    }

    const commentInput = (id) => {
        dispatch(addComment(id, comments.value))
    }

    if (!blog) {
        return null
    }

    return (
        <Container>
            <div className='blogDiv'>
                <b>Title:</b> {blog.title} <br></br>
                <b>Author:</b> {blog.author} <br></br>
                <b>Likes:</b> <span className="spanLikes"> {blog.likes} </span>{' '}
                <Button variant='dark' bg='light' onClick={() => likeButton(blog.id)}>like</Button>{' '}
                <br></br>
                <b>Url:</b> {blog.url} <br></br>
                <Button variant='dark' value={blog.id} onClick={() => deleteButton(blog.id)}>
                    Delete
                </Button>
            </div>
            <Container>
                <h1>Comments </h1>
                <p> </p>
                <span>
                    <input {...comments} />{' '}
                    <Button variant='dark' onClick={() => commentInput(blog.id)}>
                        add comment
                    </Button>
                </span>
                <p></p>
                {blog.comments.length === 0 ? (
                    <div>
                        <b>No comments yet</b>
                    </div>
                ) : (
                    <Table striped bordered hover className='tableUser'>
                        <tbody>
                            {blog.comments.map((comment) => (
                                <tr key={comment}>
                                    <td >{comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Container>
        </Container>
    )
}

export default Blog
/*

            */
