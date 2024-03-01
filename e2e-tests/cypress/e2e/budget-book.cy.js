describe('Visit BudgetBook Homepage', () => {
  it('shows login', () => {
    cy.visit('http://localhost:4200')
  })

  it('redirect to login without token', () => {
    cy.visit('http://localhost:4200/expenses')
    cy.location('pathname').should('eq', '/')
  })

  it('redirect to expenses with token', () => {
    cy.visit('http://localhost:4200/login?token=' + Cypress.env('jwt'))
    cy.location('pathname').should('eq', '/expenses')
  })

  it('user logout', () => {
    cy.visit('http://localhost:4200/login?token=' + Cypress.env('jwt'))
    cy.location('pathname').should('eq', '/expenses')
    cy.get('img[alt=Menu]').click();
    cy.get('a[href="/logout"]').click();
    cy.location('pathname').should('eq', '/')
  })

  it('add expense', () => {
    cy.visit('http://localhost:4200/expenses');
    cy.location('pathname').should('eq', '/expenses');

    cy.get('img[alt=Menu]').click();
    cy.get('span').contains('add').click();

    cy.get('input[name="Name"]').type('New expense');
    cy.get('input[name="Amount"]').type('100');
    cy.get('select[name="category"]').select('Food');

    cy.get('.add-button').click();
    cy.location('pathname').should('eq', '/expenses');
    cy.contains('.expense-list', 'New expense').should('exist');
  })


})


