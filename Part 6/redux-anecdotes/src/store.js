import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import AnecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificacionReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    anecdotes: AnecdoteReducer,
    notification: notificationReducer,
    filtro: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
      )
)

export default store