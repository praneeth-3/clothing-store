// /// <reference types="Cypress" />
function clickHats(){
    cy.contains("hats", {matchCase:false}).click();
    cy.url().should("eq", "http://localhost:3000/shop/hats");
}
function addHatToCart(index){
    clickHats();
    cy.get('[data-test-id="product-card"]').its(index).children('button').click({force: true});
}
function goToShop(){
    cy.contains('shop', {matchCase: false}).click();
}
function signInWithEmail(){
    cy.contains('SIGN IN').click();
    cy.get('[data-test-id="sign-in-email"]').type('praneeth.74.64@gmail.com');
    cy.get('[data-test-id="sign-in-password"]').type('12345678');
    cy.get('button').contains('sign in', {matchCase: false}).click();

    cy.contains('sign out', {matchCase: false});
}
function signOut(){
    cy.contains('sign out', {matchCase: false}).click();
}
function verifyCartItemCount(count){
    cy.get('[data-test-id="cart-item-count"').should('have.text', count);
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
    it("Should Not add to cart if not logged in", function(){
        addHatToCart(0);
        cy.on('window:alert', (str)=>{
            expect(str).to.equal('Please login to add items to cart');
        })
        
        verifyCartItemCount(0);
    })
    it("Adding items in cart should increment the item count", function(){
        signInWithEmail();
        goToShop();
        addHatToCart(0);
        addHatToCart(1);
        addHatToCart(1);
        verifyCartItemCount(3);
    })
    it("Adding items in cart should show in cart popup", function(){
        signInWithEmail();
        goToShop();
        addHatToCart(0);
        addHatToCart(1);
        addHatToCart(1);

        //verify items in cart dropdown
        cy.get('[data-test-id="cart-item-count"').click();
        cy.get('[data-test-id="cart-items"]').children().its(0).should('contain','Brown Brim')
        .and('contain', '1 x $25');
        cy.get('[data-test-id="cart-items"]').children().its(1).should('contain', 'Blue Beanie')        
        .and('contain', '2 x $18');
    })
    it.only("Adding items in cart should show in checkout page", function(){
        signInWithEmail();
        goToShop();
        addHatToCart(0);
        addHatToCart(1);
        addHatToCart(1);
        cy.get('[data-test-id="cart-item-count"').click();

        cy.contains('go to checkout', {matchCase: false}).click();
        cy.url().should("eq", "http://localhost:3000/checkout");

        cy.get('[data-test-id="checkout-container"]').children('[data-test-id="checkout-item"]').should('have.length', 2);
        cy.get('[data-test-id="checkout-container"]').children('[data-test-id="checkout-item"]').its(0).should('contain', 'Brown Brim❮1❯');
        cy.get('[data-test-id="checkout-container"]').children('[data-test-id="checkout-item"]').its(1).should('contain', 'Blue Beanie❮2❯');
        
        cy.contains('total: $61', {matchCase: false});
        

        cy.get('[data-test-id="checkout-container"]').children('[data-test-id="checkout-item"]').its(1).contains('❮').click();
        cy.get('[data-test-id="checkout-container"]').children('[data-test-id="checkout-item"]').its(1).should('contain', 'Blue Beanie❮1❯');
        cy.contains('total: $43', {matchCase: false});

        cy.get('[data-test-id="checkout-container"]').children('[data-test-id="checkout-item"]').its(1).contains('❮').click();
        cy.get('[data-test-id="checkout-container"]').children('[data-test-id="checkout-item"]').should('have.length', 1);
        cy.contains('total: $25', {matchCase: false});

        
        cy.get('[data-test-id="checkout-container"]').children('[data-test-id="checkout-item"]').its(0).contains('❯').click();
        cy.get('[data-test-id="checkout-container"]').children('[data-test-id="checkout-item"]').its(0).should('contain', 'Brown Brim❮2❯');
        cy.contains('total: $50', {matchCase: false});

        
        cy.get('[data-test-id="checkout-container"]').children('[data-test-id="checkout-item"]').its(0).contains('✕').click({force: true});
        cy.get('[data-test-id="checkout-container"]').children('[data-test-id="checkout-item"]').should('have.length', 0);
        cy.contains('total: $0', {matchCase: false});
    })
    it("Sign out should remove cart items", function(){
        signInWithEmail();

        goToShop();
        addHatToCart(1);
        verifyCartItemCount(1);

        signOut();
        verifyCartItemCount(0);
    })
})