/* eslint-disable react/react-in-jsx-scope */
/*eslint linebreak-style: ["error", "windows"]*/
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'

const Menu = ({ closeSesion }) => {
    const users = useSelector((state) => state.users)
    return (
        <Navbar variant="light" bg="secondary" className="navMenu">
            <Container>
                <Navbar.Brand>
                    <b>FullStackOpen</b>
                </Navbar.Brand>
                <LinkContainer to="/" variant="dark">
                    <Button bg="light">
                        <b>Blogs</b>
                    </Button>
                </LinkContainer>
                <Navbar.Brand></Navbar.Brand>
                <Navbar.Toggle />
                <LinkContainer to="/users" variant="dark">
                    <Button bg="dark">
                        <b>Users</b>
                    </Button>
                </LinkContainer>
                <Navbar.Toggle />
                <Navbar.Collapse className="menuText">
                    <Navbar.Text>
                        <b>{users.username} Logged in</b>
                        {'  '}
                        <Button onClick={() => closeSesion()} variant="dark">
                            Loggout
                        </Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu
