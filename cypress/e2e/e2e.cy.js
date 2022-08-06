// /// <reference types="Cypress" />
function clickHats(){
    cy.contains("hats").click();
    cy.url().should("eq", "http://localhost:3000/shop/hats");
}
describe("E2E", function(){
    this.beforeEach(()=>{
        cy.visit('/');
    })
    it("Contains all categories", function(){
        cy.get('[data-test-id="category"]').its("length").should("eq", 5);
    })
    it("Click on hats shows all hats products", function(){
        clickHats();
        cy.get('img').its("length").should("be.gt", 1);
    })
    it.only("Should Not add to cart if not logged in", function(){
        clickHats();
        cy.get('[data-test-id="productCard"]').first().children('button').click({force: true});
        cy.on('window:alert', (str)=>{
            expect(str).to.equal('Please login to add items to cart');
        })
        
        cy.get('[data-test-id="cart-item-count"').should('have.text', 0);
    })
})