/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../Hooks/index'
import { Loggin } from '../reducers/usersReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const LoginForm = (props) => {
    const username = useField('text')
    const password = useField('password')

    const handleLogin = async (event) => {
        event.preventDefault()
        await props.Loggin({
            username: username.value,
            password: password.value
        })
    }

    return (
        <div>

            <div className="logginDiv">
                <h2>Loggin</h2>
                <Form onSubmit={handleLogin}>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="input"
                            placeholder="Enter Username"
                            {...username}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="input"
                            placeholder="Enter password"
                            {...password}
                        />
                    </Form.Group>
                    <p></p>
                    <Button variant="primary" type="submit">
                        Loggin
                    </Button>
                </Form>
            </div>
        </div>
    )
}

const mapDispatchToProps = { Loggin }
const conectedLogin = connect(null, mapDispatchToProps)(LoginForm)
export default conectedLogin
