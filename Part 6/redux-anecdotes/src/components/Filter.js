import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {

    const handleChange = (event) => {
        event.preventDefault()

        const datos = event.target.value
        const listado = props.anecdotes.filter((elem) =>
            elem.content.includes(datos)
        )
        
        props.filterAnecdotes(listado)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input name="filterIn" onChange={handleChange} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    filterAnecdotes
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
