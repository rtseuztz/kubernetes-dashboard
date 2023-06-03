describe('kubernetes dashboard', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://localhost:5173')
    })
    it('navigates to pods correctly', () => {
        // cy.get()
        // cy.get('table tr').eq(1).click()
        cy.get('.drawer-container nav a').eq(1).click()
        cy.url().should('include', '/pods')
    })
    it('navigates to home correctly', () => {
        // cy.get()
        // cy.get('table tr').eq(1).click()
        cy.get('.drawer-container nav a').eq(0).click()
        cy.url().should('include', '/')
    })
    it('navigates to a pod correctly', () => {
        cy.get('.drawer-container nav a').eq(1).click()
        cy.url().should('include', '/pods')
        cy.get('table tr').eq(1).click()
        cy.url().should('include', '/pods/')
    })
})