/* eslint-disable eqeqeq */
/*eslint linebreak-style: ["error", "windows"]*/
import { React, useEffect } from 'react'
/*import loginService from './services/login'
import Togglable from './components/Togglable'
import Alert from './components/Alert'*/
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { initialBlogs } from './reducers/blogReducer'
import { initialUsers } from './reducers/userReducer'
import { setUser, Logout } from './reducers/usersReducer'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import Menu from './components/Menu'
import UserView from './components/user'
import { Routes, Route, useMatch } from 'react-router-dom'
import UsersList from './components/usersList'

const App = (props) => {
    const usersMatch = useMatch('/users/:id')
    const blogMatch = useMatch('/blogs/:id')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            props.setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        props.initialBlogs()
        props.initialUsers()
    }, []) //props

    const closeSesion = () => {
        window.localStorage.clear()
        props.setUser(null)
        props.Logout()
    }

    const selectedUser = usersMatch
        ? props.user.find((elem) => elem.id === usersMatch.params.id)
        : null

    const selectedBlog = blogMatch
        ? props.blogs.find((elem) => elem.id === blogMatch.params.id)
        : null

    return (
        <div className="containerBody">
            {props.users === null ? (
                <LoginForm />
            ) : (
                <div>
                    <Menu closeSesion={closeSesion} />
                    <Notification />
                    <Routes>
                        <Route
                            path="/users"
                            element={<UsersList></UsersList>}
                        ></Route>
                        <Route path="/" element={<BlogList />}></Route>
                        <Route
                            path="/users/:id"
                            element={<UserView user={selectedUser} />}
                        ></Route>
                        <Route
                            path="blogs/:id"
                            element={<Blog blog={selectedBlog} />}
                        ></Route>
                    </Routes>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        users: state.users,
        blogs: state.blogs
    }
}

const mapDispatchToProps = { initialBlogs, initialUsers, setUser, Logout }
const conectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default conectedApp
