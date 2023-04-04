describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Cypress Tester',
      username: 'cypresstester',
      password: 'secret'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cypresstester')
      cy.get('#password').type('secret')
      cy.get('#loginButton').click()

      cy.contains('Cypress Tester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('cypresstester')
      cy.get('#password').type('falsePassword')
      cy.get('#loginButton').click()

      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cypresstester', password: 'secret' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Cypress test blog title')
      cy.get('#author').type('Cypress test blog author')
      cy.get('#url').type('tesblog.url')
      cy.get('#create-blog-button').click()
      cy.contains('Cypress test blog title Cypress test blog author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Cypress test blog title',
          author: 'Cypress test blog author',
          url: 'tesblog.url'
        })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('can be removed', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.on('window:confirm', function () {
          true
        })

        cy.get('html').should(
          'not.contain',
          'Cypress test blog title Cypress test blog author'
        )
      })
    })

    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'The title with the least likes',
          author: 'Cypress test blog author',
          url: 'tesblog.url'
        })
        cy.createBlog({
          title: 'The title with the most likes',
          author: 'Cypress test blog author',
          url: 'tesblog.url'
        })
        cy.createBlog({
          title: 'The title with the second most likes',
          author: 'Cypress test blog author',
          url: 'tesblog.url'
        })
      })

      it('should show the blogs in correct order', function () {
        cy.contains('The title with the most likes').contains('view').click()

        cy.contains('The title with the most likes')
          .get('#like-button')
          .click()
          .wait(500)
          .click()
          .wait(500)
          .click()

        cy.contains('The title with the most likes').contains('hide').click()

        cy.contains('The title with the second most likes')
          .contains('view')
          .click()

        cy.contains('The title with the second most likes')
          .get('#like-button')
          .click()
          .wait(500)
          .click()

        cy.contains('The title with the second most likes')
          .contains('hide')
          .click()

        cy.get('.blogBasicInfo')
          .eq(0)
          .should('contain', 'The title with the most likes')
        cy.get('.blogBasicInfo')
          .eq(1)
          .should('contain', 'The title with the second most likes')
      })
    })
  })

  it('only the user who added the blog should see the remove button', function () {
    const secondUser = {
      name: 'Other Tester',
      username: 'othertester',
      password: 'secret'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, secondUser)

    cy.login({ username: 'othertester', password: 'secret' })
    cy.createBlog({
      title: 'Blog that shouldnt be removable',
      author: 'Other Author',
      url: 'otherblog.com'
    })

    cy.login({ username: 'cypresstester', password: 'secret' })

    cy.contains('view').click()
    cy.get('#remove-button').should('not.exist')
  })
})
