import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <Router>
            <div>
                <Link style={padding} to="/">
                    {' '}
                    anecdotes{' '}
                </Link>
                <Link style={padding} to="/createnew">
                    {' '}
                    create new{' '}
                </Link>
                <Link style={padding} to="/about">
                    {' '}
                    about{' '}
                </Link>
            </div>
            
            <Switch>
                <Route path=''></Route>
            </Switch>
        </Router>
    )
}
export default Menu