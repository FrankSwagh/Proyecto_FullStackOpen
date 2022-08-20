/*eslint linebreak-style: ["error", "windows"]*/
import { React } from 'react'
import Table from 'react-bootstrap/Table'

const UserView = (props) => {
    const user = props.user
    if (!user) {
        console.log('nulo')
        return null
    }
    return (
        <div className='userDiv'>
            <h1>User {user.username}</h1>
            <div>
                <Table striped bordered hover className='tableUser'>
                    <thead>
                        <b><h2>Added blogs</h2></b>
                    </thead>
                    <tbody>
                        {user.blogs.map((blog) => (
                            <tr key={blog.id}>
                                <td>{blog.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ul></ul>
            </div>
        </div>
    )
}

export default UserView
