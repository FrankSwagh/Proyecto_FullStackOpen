/*eslint linebreak-style: ["error", "windows"]*/
import { connect } from 'react-redux'
import React from 'react'
import AddBlog from './addBlog'
import Table from 'react-bootstrap/Table'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'

const blogsList = (props) => {
    props.blogs.sort((a, b) => a.likes - b.likes)
    return (
        <div className="containerBlogList">
            <AddBlog />
            <p>{' '}</p>
            <p>{' '}</p>
            <h2><b>Blogs</b> </h2>
            <p>{' '}</p>
            <Table striped bordered hover className='tableUser'>
                <tbody>
                    {props.blogs.map((blog) => (
                        <tr key={blog.id} >
                            <td>
                                <LinkContainer to={`/blogs/${blog.id}`}>
                                    <Button variant="link">{blog.title}</Button>
                                </LinkContainer>
                            </td>
                            <td>{blog.author}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div></div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

const conectedBlogList = connect(mapStateToProps, null)(blogsList)
export default conectedBlogList
