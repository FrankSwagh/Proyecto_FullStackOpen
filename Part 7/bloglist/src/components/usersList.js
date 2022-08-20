/* eslint-disable react/react-in-jsx-scope */
/*eslint linebreak-style: ["error", "windows"]*/
import { addMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { React } from 'react'
import Table from 'react-bootstrap/Table'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'

const UsersList = (props) => {
    const users = props.user

    return (
        <div >
            <h2>Users</h2>
            <div className="containerUserList">
                <Table>
                    <Table striped bordered hover className="tableUser">
                        <thead>
                            <td></td>
                            <td>
                                <h2>
                                    <b>Blogs created</b>
                                </h2>
                            </td>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="linkLabel">
                                        <LinkContainer to={`/users/${user.id}`}>
                                            <Button variant="link">
                                                {user.name}
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                    <td>{user.blogs.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Table>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = { addMessage }

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
