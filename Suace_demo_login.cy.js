describe("Login page validation and authentication Tests" , function(){
    

    beforeEach( function(){
        // launch application 

        cy.visit("https://sauce-demo.myshopify.com/")
        cy.get("#customer_login_link").click()

    })

    it("Validate login page element" , function(){

        cy.get(".accounts-title").should("be.visible")
        cy.get("#customer_email").should("be.visible")
        cy.get("#customer_password").should("be.visible")
        cy.get("input[value='Sign In']").should("be.visible").and("be.enabled") 


    })


    it("login with valid credential and verify navigation to product page" , ()=>{

        cy.get("#customer_email").type("gvarsha286@gmail.com")
        cy.get("#customer_password").type("123456")
        cy.get("input[value='Sign In']").click()
        cy.url("https://sauce-demo.myshopify.com/account").should("include" , "myshopify.com/account")

        // verify succesful navigation 
        cy.url("https://sauce-demo.myshopify.com/account").should("include" , "myshopify.com/account")
        cy.get("#accounts-title").should("be.visible")
        cy.get(".active").should("exist")

    })

    it("Login with invalid credentials and validate error message", ()=> {
cy.get("#customer_email").type("gvarsha26@gmail.com")
        cy.get("#customer_password").type("12456") 
        cy.get("input[value='Sign In']").click()
        cy.wait(6000)
        cy.get("div[class='errors']")
        .should("be.visible")
        .and("contain", "Incorrect email or password.")
    })


    it(" Check login feild validation" ,()=>{

        // both feild are empty 
        cy.get("input[value='Sign In']").click()
        cy.get("div[class='errors']")
        .should("be.visible")
        .and("contain", "Incorrect email or password.")


    })

    it("only username entered in the feild", function(){

        cy.reload()
        cy.get("#customer_email").type("gvarsha26@gmail.com")
        cy.get("input[value='Sign In']").click()
        cy.get("div[class='errors']")
        .should("be.visible")
        .and("contain", "Incorrect email or password.")

    }) 


    it("only username entered in the feild", function(){

        cy.reload()
        cy.get("#customer_password").type("12456")
        cy.get("input[value='Sign In']").click()
        cy.get("div[class='errors']")
        .should("be.visible")
        .and("contain", "Incorrect email or password.")

    })

})