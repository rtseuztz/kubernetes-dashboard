import { execSync } from "child_process"

describe('kubernetes dashboard', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://localhost:5173')
    })
    describe('namespace', () => {

        it('has the namespaces listed', () => {
            // We use the `cy.get()` command to get all elements that match the selector.
            // Then, we use `should` to assert that there are two matched items,
            // which are the two default items.
            cy.get('table tr').should('have.length.above', 1)
            //find the kube-system namespace
            cy.get('table tr').contains('kube-system').should('exist')
        })
    })

    describe('pods', () => {

        beforeEach(() => {
            cy.visit('/pods')
        })
        it('has the pods listed', () => {
            // We use the `cy.get()` command to get all elements that match the selector.
            // Then, we use `should` to assert that there are two matched items,
            // which are the two default items.
            cy.get('table tr').should('have.length.above', 1)
            //find the kube-system namespace
            cy.get('table tr').contains('kube-system').should('exist')
        })
        // it('gains a new pod when kubernetes creates one', () => {
        //     const originalPodCount = cy.get('table tr').its('length')
        //     const obfuscatedPodName = 'pod-' + Math.random().toString(36).substring(7)
        //     execSync(`kubectl run ${obfuscatedPodName} --image=nginx:alpine`)
        //     cy.get('table tr').should('have.length.above', originalPodCount)
        //     cy.get('table tr').contains(obfuscatedPodName).should('exist')

        //     execSync(`kubectl delete pod ${obfuscatedPodName}`)
        //     cy.get('table tr').should('have.length', originalPodCount)
        // })
    })
})