/// <reference types="cypress" />

var TODO_ITEM_ONE = 'Virtual Adventure';
var TODO_ITEM_TWO = 'Booster Bingo';
var TODO_ITEM_THREE = 'Lip Sync Contest';
describe('Input form', () => {
    beforeEach(() => {
        cy.visit('localhost:8888')
      })
    it('check input text', () => {
        cy.get('.new-todo').type('Vision Conference').should('have.value', 'Vision Conference');
    });


    it('check todo item', () => {
        cy.get('.new-todo').clear()
        cy.get('.new-todo').type('Vision Conference{enter}')
        cy.get('.todo-list li').should('have.text', 'Vision Conference');
    });
    it('Checks footer is available after adding item', () => {
        cy.get('.new-todo').type('Vision Conference{enter}')
        cy.get('.footer').should('be.visible');
    })

    it('should add multiple todos', () => {
        cy.addTodo(TODO_ITEM_ONE);
        cy.addTodo(TODO_ITEM_TWO);
        cy.addTodo(TODO_ITEM_THREE);
        cy.get('.todo-count').contains('3 items left')
    })

    it('should have append new items to the bottom of the list', () => {
        cy.addTodo('Vision Conference')
        cy.addTodo(TODO_ITEM_ONE);
        cy.addTodo(TODO_ITEM_TWO);
        cy.addTodo(TODO_ITEM_THREE);
        cy.get('.todo-count').contains('4 items left')

        cy.get('.todo-list li')
            .eq(0)
            .find('label')
            .should('contain', 'Vision Conference')

        cy.get('.todo-list li')
            .eq(1)
            .find('label')
            .should('contain', TODO_ITEM_ONE)

        cy.get('.todo-list li')
            .eq(2)
            .find('label')
            .should('contain', TODO_ITEM_TWO)

        cy.get('.todo-list li')
            .eq(3)
            .find('label')
            .should('contain', TODO_ITEM_THREE)
    })

    it('should allow me to edit an item', () => {
        cy.addTodo('Vision Conference')
        cy.addTodo(TODO_ITEM_ONE);
        cy.addTodo(TODO_ITEM_TWO);
        cy.addTodo(TODO_ITEM_THREE);
        cy.get('.todo-list li').eq(1)
            .find('label')
            .dblclick()

        // clear out the inputs current value
        // and type a new value
        cy.get('.todo-list li').eq(1).find('.edit').clear()
            .type('Learn Cypress').type('{enter}')
    })
})


