/*eslint linebreak-style: ["error", "windows"]*/
import { React, useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import AddBlog from './components/addBlog'
import Alert from './components/Alert'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService
            .getAll()
            .then((respose) => {
                setBlogs(respose)
            })
            .catch(() => {
                console.log('Error al obtener datos')
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const agregarBlog = async (blog) => {
        try {
            blogFormRef.current.toggleVisibility()
            const respose = await blogService.create(blog)
            setBlogs(blogs.concat(respose))
            setAlertMessage('Blog has been added')
            setTimeout(() => {
                setAlertMessage(null)
            }, 3000)
        } catch (exception) {
            setErrorMessage('Error! Can\'t add blog')
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }

    ///////////////////////////////////       Controladores de eventos      ///////////////////////////////////////////////////////////////////////////
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            blogService.setToken(user.token)
            setUser(user)
            window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setUsername('')
            setPassword('')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.clear()
        setUser(null)
    }

    const handleLikes = async (id) => {
        let findblog = blogs.find((elem) => elem.id === id)
        const blogUpdated = {
            ...findblog,
            likes: findblog.likes + 1,
        }
        await blogService.update(findblog.id, blogUpdated)
        setBlogs(blogs.map((elem) => (elem.id === id ? blogUpdated : elem)))
    }

    ///////////////////////////////////       Impresores de datos      ///////////////////////////////////////////////////////////////////////////
    const loginForm = () => {
        return (
            <div>
                <Togglable buttonLabel="login">
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                </Togglable>
            </div>
        )
    }

    const blogsForm = () => {
        blogs.sort((a, b) => a.likes - b.likes)
        return (
            <div className='blogs'>
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <AddBlog agregarBlog={agregarBlog} handleLikes={handleLikes} />
                </Togglable>
                <div>
                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            handleLikes = { () => handleLikes(blog.id) }
                            handleDelete = { () => handleDelete(blog.id) }
                        />
                    ))}
                </div>
            </div>
        )
    }



    const handleDelete = async (id) => {
        try{
            let findblog = blogs.find((elem) => elem.id === id)
            console.log(findblog)
            if(window.confirm(`Do realy want to delete ${findblog.title}`)){
                if(user.username === findblog.user.username){
                    await blogService.borrar(id)
                } else {
                    setErrorMessage('Only the creator can delete the blog')
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 3000)
                }
            } else {
                setErrorMessage('Operation canceled')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)
            }
        }catch(exception){
            setErrorMessage('Error')
            console.log(exception)
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }


    return (
        <div>
            <h2>blogs</h2>
            <Notification message={alertMessage} />
            <Alert message={errorMessage} />
            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <p>
                        {user.name} logged-in <button onClick={handleLogout}>logout</button>
                    </p>
                    {blogsForm()}
                </div>
            )}
        </div>
    )
}

export default App
