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
    cy.visit('http://localhost:4200/login?token=' + Cypress.env('jwt'))
    cy.location('pathname').should('eq', '/expenses');

    cy.get('img[alt=Menu]').click();
    cy.get('span').contains('add').click();

    cy.get('#expenseName').type('test');
    cy.get('#expenseAmount').type('100');
    cy.get('#expenseCategory').select('Food');

    cy.get('.add-button').click();
    cy.location('pathname').should('eq', '/expenses');
    cy.contains('test').should('exist');
  })
  

  it('update expense', () => {
    cy.visit('http://localhost:4200/login?token=' + Cypress.env('jwt'))
    cy.location('pathname').should('eq', '/expenses');

    cy.get('.expense').each(($el, index) => {
      if (index === 3) {
        cy.wrap($el)
          .find('img[src="../../../assets/images/edit.png"]')
          .click();
      }
    });
    
    cy.get('#expenseName').clear().type('New expense2');
    cy.get('#expenseAmount').type('150');
    cy.get('#expenseCategory').select('Gift');

    cy.get('.edit-button').click();
    cy.location('pathname').should('eq', '/expenses');
    
  })
  
  it('delete expense', () => {
    cy.visit('http://localhost:4200/login?token=' + Cypress.env('jwt'))
    cy.location('pathname').should('eq', '/expenses');

    cy.get('.expense').each(($el, index) => {
      
      if (index === 2) {
        
        cy.wrap($el)
          .find('img[src="../../../assets/images/delete.png"]')
          .click(); 
      }
    })
    
  })
  
})


