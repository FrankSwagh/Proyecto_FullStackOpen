/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react'
import { useField } from '../Hooks/index'
import { connect } from 'react-redux'
import { AgregarBlog } from '../reducers/blogReducer'
import { addMessage } from '../reducers/notificationReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const AddBlog = (props) => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const handleBlogs = async (event) => {
        event.preventDefault()
        const Nuevo = {
            title: title.value,
            author: author.value,
            url: url.value
        }
        props.addMessage(`You added ${Nuevo.title}`, 4000)
        JSON.stringify(Nuevo)
        props.AgregarBlog(Nuevo)
        title.reset.value()
        author.reset.value()
        url.reset.value()
    }

    return (
        <div className="formDiv">
            <h2>Create new blog</h2>
            <Form onSubmit={handleBlogs} className="formMenu">
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="input"
                        placeholder="Enter title"
                        {...title}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author:</Form.Label>
                    <Form.Control
                        type="input"
                        placeholder="Enter author"
                        {...author}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Url:</Form.Label>
                    <Form.Control
                        type="input"
                        placeholder="Enter Url"
                        {...url}
                    />
                </Form.Group>
                <p> </p>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
            <p> </p>
            <p> </p>
            <p> </p>
        </div>
    )
}

export default connect(null, { AgregarBlog, addMessage })(AddBlog)
