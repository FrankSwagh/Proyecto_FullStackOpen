/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import Togglable from './Togglable'
import AddBlog from './addBlog'

/*
describe('verificar contenido', () => {
    test('renders content', () => {
        const blog = {
            title: 'Los cuentos de Canterbury',
            author: 'Geoffrey Chaucer',
            url: 'www.libroteca.com'
        }

        const component = render(
            <Blog blog={blog} />
        )

        const div = component.container.querySelector('div')
        console.log(prettyDOM(div))
    })

    test('renders content', () => {
        const blog = {
            title: 'Los cuentos de Canterbury',
            author: 'Geoffrey Chaucer',
            url: 'www.libroteca.com'
        }

        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} handleLikes={mockHandler} />
        )

        const button = component.getByText('like')
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(1)
    })
})


describe('<Togglable />', () => {
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv" />
            </Togglable>
        )
    })

    test('renders its children', () => {
        expect(
            component.container.querySelector('.testDiv')
        ).toBeDefined()
    })

    test('at start the children are not displayed', () => {
        const div = component.container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('toggled content can be closed', () => {
        const button = component.container.querySelector('button')
        fireEvent.click(button)

        const closeButton = component.getByText('cancel')
        fireEvent.click(closeButton)

        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})
*/
test('<AddBlog /> updates parent state and calls onSubmit', () => {
    const agregarBlog = jest.fn()

    const component = render(
        <AddBlog agregarBlog={agregarBlog} />
    )

    const title = component.container.querySelector('input')
    const create = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'Los cuentos de Canterbury' }
    })
    fireEvent.submit(create)

    expect(agregarBlog.mock.calls).toHaveLength(1)
    console.log(agregarBlog.mock.calls[0])
    expect(agregarBlog.mock.calls[0][0].title).toBe('Los cuentos de Canterbury' )
})

describe('Pruebas de componente ', () => {
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel="extend">
                <div className="testDiv" />
            </Togglable>
        )
    })

    test('Mostrar blog y titlo, pero no url, ni likes', () => {
        const div = component.container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
        const divBlog = component.container.querySelector('div')
        console.log(prettyDOM(divBlog))
    })

    test('Despues de hacer clic en mostrar, se muestra url y likes', () => {
        const button = component.getByText('extend')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
        const divBlog = component.container.querySelector('div')
        console.log(prettyDOM(divBlog))
    })

})

describe('Pruebas en componente Blog', () => {

    test('Dos clics en el boton de like', () => {

        const blog = {
            title: 'Los cuentos de Canterbury',
            author: 'Geoffrey Chaucer',
            url: 'www.libroteca.com'
        }

        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} handleLikes={mockHandler} />
        )

        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)

        const div = component.container.querySelector('div')
        console.log(prettyDOM(div))
        expect(mockHandler.mock.calls).toHaveLength(2)
    })

    test('Proporcionando los datos necesarios para una nueva entrada', () => {
        const agregarBlog = jest.fn()

        const component = render(
            <AddBlog agregarBlog={agregarBlog} />
        )

        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')
        const create = component.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: 'Los cuentos de Canterbury' }
        })
        fireEvent.change(author, {
            target: { value: 'Geoffrey Chaucer' }
        })
        fireEvent.change(url, {
            target: { value: 'www.libroteca.com' }
        })
        fireEvent.submit(create)

        expect(agregarBlog.mock.calls).toHaveLength(1)
        console.log(agregarBlog.mock.calls[0])
        expect(agregarBlog.mock.calls[0][0].title).toBe('Los cuentos de Canterbury' )
    })
})