/*eslint linebreak-style: ["error", "windows"]*/
describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Frank Cabrera',
            username: 'Frank',
            password: 'supersegura'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)

        cy.visit('http://localhost:3002')
    })

    describe('Cuando existe una nota', function () {
        beforeEach(function () {

            cy.login({ username: 'Frank', password: 'supersegura' })
            cy.agregarBlog({
                title: 'Los endemoniados',
                author: 'Fiódor Dostoievski',
                url: 'www.bookefilia.com'
            })

        })

        it('Aumentar en 1 los likes', function () {

            cy.contains('Los endemoniados')
                .contains('Extend')
                .click()
            cy.contains('Los endemoniados')
                .contains('like')
                .click()

            cy.contains('Los endemoniados')
                .contains('1')

        })
    })

    it('Mostrar el formulario de inicio de sesion', function() {
        cy.contains('login').click()
        cy.contains('username')
        cy.contains('password')
    })

    describe('Cuando hemos accedido', function() {
        beforeEach(function() {

            cy.login({ username: 'Frank', password: 'supersegura' })

        })

        it('Crear un nuevo blog', function() {

            cy.agregarBlog({
                title: 'Los cuentos de Canterbury',
                author: 'Geoffrey Chaucer',
                url: 'www.libroteca.com'
            })
            cy.contains('www.libroteca.com')

        })

        it('Aumentar en 1 los likes', function () {

            cy.agregarBlog({
                title: 'Los endemoniados',
                author: 'Fiódor Dostoievski',
                url: 'www.bookefilia.com'
            })

            cy.contains('Los endemoniados')
                .contains('Extend')
                .click()
            cy.contains('Los endemoniados')
                .contains('like')
                .click()

            cy.contains('Los endemoniados')
                .contains('1')

        })

        describe('Cuando se crean muchos blogs', function() {
            beforeEach(function () {

                cy.agregarBlog({ title: 'Los cuentos de Canterbury', author: 'Geoffrey Chaucer', url: 'www.libroteca.com' })
                cy.agregarBlog({ title: 'Diario de un loco', author: 'Lu Xun', url: 'www.librofilicos.com' })
                cy.agregarBlog({ title: 'Tiempo de migrar al norte', author: 'Tayeb Salih', url: 'www.leyendo.com' })

            })

            it('Agregar un like al segundo blog', function () {
                cy.contains('Diario de un loco')
                    .contains('Extend')
                    .click()
                cy.contains('Diario de un loco')
                    .contains('like')
                    .click()

                cy.contains('Diario de un loco')
                    .contains('1')
            })

            it('Otro blog puede tener likes ', function () {
                cy.contains('Los cuentos de Canterbury').contains('Extend').click()
                cy.contains('Los cuentos de Canterbury').contains('like').click().wait(1000).click().wait(1000).click()
                cy.contains('Los cuentos de Canterbury').contains('cancel').click().wait(1000)
                cy.contains('Tiempo de migrar al norte').contains('Extend').click()
                cy.contains('Tiempo de migrar al norte').contains('like').click().wait(1000).click().wait(1000)
                cy.contains('Tiempo de migrar al norte').contains('cancel').click().wait(1000)
                cy.contains('Diario de un loco').contains('Extend').click()
                cy.contains('Diario de un loco').contains('like').click()
                cy.contains('Los cuentos de Canterbury').contains('Extend').click()
                cy.contains('Tiempo de migrar al norte').contains('Extend').click()

                cy.get('span').should(($span) => {
                    const text = $span.text()
                    console.log(text)
                    expect(text[1]).to.include('1')
                    expect(text[4]).to.include('2')
                    expect(text[7]).to.include('3')
                })


            })
        })
    })

    it('El acceso falla por contraseña o usuario erroneo', function() {

        cy.contains('login').click()
        cy.get('#username').type('Frank')
        cy.get('#password').type('wrong')
        cy.get('#loginButton').click()

        cy.get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Frank Cabrera logged-in')

    })
})