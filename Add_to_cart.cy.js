Cypress.on('uncaught:exception', (err, runnable) => {
  return false  // ✅ prevents Cypress from failing the test
})
    
    
    describe("Cart Automation - Single & Multiple Random In-Stock Products" ,()=>{

        let selectedproducts= [] 

        beforeEach(function(){

            cy.visit("https://sauce-demo.myshopify.com/collections/all")

        })

        // single add to cart product case 
        it("Add SINGLE random in-stock product to cart" , function(){

            cy.get("div.four.columns").filter((index , product)=>{
                return !product.innerText.includes("SOLD OUT")
            }).then(($inStockProducts) => {
                expect($inStockProducts.length).to.be.greaterThan(0)

                const randomIndex = Math.floor(Math.random() * $inStockProducts.length )
                const randomProduct = $inStockProducts[randomIndex] 

                const name = randomProduct.querySelector("h2, h3, .product-title")?.innerText
                const price = randomProduct.querySelector("h4, .price")?.innerText

                selectedproducts.push({ name , price}) 

                cy.wrap(randomProduct).find("a").first().click()
                cy.get("input[class='btn add-to-cart']").should("be.visible").click()

            cy.wait(5000) 

            })

            cy.get("#cart-target-desktop").should("contain", "1") 

        })


        // ADD MULTIPLE RANDOM IN-STOCK PRODUCTS

        it("Add More than One product to cart", () => {
        // Visit collection page
        cy.visit("https://sauce-demo.myshopify.com/collections/all")

        // Get in-stock products
        cy.get('div.four.columns').filter((index, product) => {
            return !product.innerText.includes("SOLD OUT")
        }).then(($products) => {
            const productArray = Array.from($products)
            const selected = Cypress._.sampleSize(productArray, 2)

            selected.forEach((product, index) => {
                const name = product.querySelector("h2, h3, .product-title")?.innerText
                const price = product.querySelector("h4, .price")?.innerText

                // Click product link
                cy.contains(name).closest("a").click()
                cy.get("input.btn.add-to-cart").should("be.visible").click()
                cy.wait(5000)

                // Go back if not last product
                if (index < selected.length - 1) cy.go("back")
            })
        })

        // Check cart badge has at least 2 items
        cy.reload()
        cy.get("#cart-target-desktop").should("contain", "2") 
        })

        it("Navigate to Cart, validate products, remove and check UI updates", function(){

            // add product 
            cy.get("div.four.columns").first().click()
            cy.wait(2000)
            cy.get("input[class='btn add-to-cart']").should("be.visible").click()

            // // got to cart
            cy.wait(4000)
            cy.get("a[class='checkout']").click()
           


            // // validate cart
            cy.get("div[class='six columns alpha description']").eq(1).should("be.visible")
            cy.get("div[class='six columns alpha description']").eq(0).should("be.visible")

            cy.get("div[class='two columns price desktop']").eq(1).should("be.visible")
            cy.get("div[class='two columns price desktop']").eq(2).should("be.visible")


            cy.get("input[id='updates_611942549']").eq(1).should("be.visible").and("have.value" ,"1")
            // // cy.get("input[id='updates_611942549']").eq(1)
            // // .clear()
            // // .type("2",{entre})
            // // .should("have.value" , "2")

            cy.get("div[class='two columns total desktop']").eq(1).should("be.visible")
            cy.get("div[class='two columns total desktop']").eq(2).should("be.visible")

            cy.get("h2").eq(0).should("be.visible")

            // remove product 

            cy.get("input[id='updates_611942549']").eq(1).clear()
            cy.get("input[id='updates_611942549']").eq(1).type('0{enter}')
            cy.wait(3000)
            

            cy.get("#cart").should("have.text" , "\n\t\n\t It appears that your cart is currently empty! Continue Shopping.\n\t\n")

            

        })

    }) 

    


    

