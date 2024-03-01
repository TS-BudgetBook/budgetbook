describe('Visit BudgetBook Homepage', () => {
  it('shows login', () => {
    cy.visit('http://localhost:4200')
  })

  it('redirect to login without token', () => {
    cy.visit('http://localhost:4200/expenses')
    cy.location('pathname').should('eq', '/')
  })

  it('redirect to expenses with token', () => {
    cy.visit('http://localhost:4200/login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibWFyY29AdGVjaHN0YXJ0ZXIuZGUiLCJpYXQiOjE3MDkyOTAyODMsImV4cCI6MTcwOTU0OTQ4M30.VvaUvTcTggG8S1Vn1GuEyDd4wFENhLbzxsbHfgqSxAw')
    cy.location('pathname').should('eq', '/expenses')
  })

})


