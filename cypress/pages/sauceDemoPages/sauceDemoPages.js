export class sauceDemoPages {

    verifyTitleSwagLabs() {
        cy.get('div[class="login_logo"]').should('have.text', 'Swag Labs');
    }

    verifyLoginSuccess() {
        cy.get('div[class="app_logo"]').should('have.text', 'Swag Labs')
        cy.get('span[class="title"]').should('have.text', 'Products')
        cy.get('a[class="shopping_cart_link"]').should('be.visible')
        cy.get('div[class="inventory_item"]').should('be.visible');
    }

    verifyLogOutUser() {
        cy.get('h3[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
        cy.get('button[class="error-button"]').should('have.text', 'be.visible')
    }

    verifyProblemUser() {
        cy.get('a[id="item_4_img_link"]').should('be.visible')
        cy.get('a[id="item_0_img_link"]').should('be.visible')
        cy.get('a[id="item_1_img_link"]').should('be.visible')
        cy.get('a[id="item_5_img_link"]').should('be.visible')
        cy.get('a[id="item_2_img_link"]').should('be.visible')
        cy.get('a[id="item_3_img_link"]').should('be.visible')
    }

    verifyPerformanceGlitchUser() {
        cy.get('a[id="item_4_img_link"]').should('be.visible')
        cy.get('a[id="item_0_img_link"]').should('be.visible')
        cy.get('a[id="item_1_img_link"]').should('be.visible')
        cy.get('a[id="item_5_img_link"]').should('be.visible')
        cy.get('a[id="item_2_img_link"]').should('be.visible')
        cy.get('a[id="item_3_img_link"]').should('be.visible')
    }

    clickAddProduct() {
        cy.get('div.inventory_item').each(($item) => {
            cy.wrap($item).find('div.inventory_item_name').invoke('text').then((title) => {
                const productName = title.trim();

                if (productName.includes('T-Shirt') || productName.includes('Flashlight') || productName.includes('Backpack')) {
                    cy.log('Target Product: ' + productName);
                    cy.wrap($item).find('button').contains('Add to cart').click();
                } else {
                    cy.log('Skip this product, no matching keyword.');
                    cy.screenshot();
                }
            });
        });
    }

    clickIconCart() {
        cy.get('a[class="shopping_cart_link"]').click()
    }

    clickRemoveProduct(keyword) {
        cy.get('div[class="cart_item"]').each(($item) => {
            cy.wrap($item).find('div[class="inventory_item_name"]').invoke('text').then((title) => {
                const assertTarget = title.trim();
                cy.log(assertTarget);

                if (assertTarget.includes(keyword)) {
                    cy.wrap($item).find('button').contains('Remove').click();
                } else {
                    cy.log('Dont remove this product, because dont have keyword.');
                }
            });
        });
    }

    clickCheckoutButton() {
        cy.get('button[id="checkout"]').contains('Checkout').click()
    }

    verifyPageCheckoutInfo() {
        cy.get('span[class="title"]').should('have.text', 'Checkout: Your Information')
        cy.get('button[id="cancel"]').should('be.visible')
        cy.get('input[id="continue"]').should('be.visible')
    }

    clickSubmitCheckout() {
        cy.get('input[id="continue"]').should('have.value', 'Continue').click()
    }

    calculateTotalTax() {
        let expectedItemTotal = 0
        let expectedTaxTotal = 0
        let expectedTotal = 0;

        cy.get('div[class="cart_item"]').each((itemCart, index) => {
            cy.wrap(itemCart).find('div[class="inventory_item_price"]').invoke('text').then((itemPrice) => {
                const itemTotal = parseFloat(itemPrice.replace('$', '').trim());
                const itemTax = parseFloat((itemTotal * 0.08).toFixed(2));

                expectedItemTotal += itemTotal
                expectedTaxTotal += itemTax
                expectedTotal = (expectedItemTotal + expectedTaxTotal)

                cy.log('Item price ' + (index + 1) + ' : ' + itemTotal.toFixed(2) + ' Tax : ' + itemTax)
                cy.log('expectedTaxTotal ' + (index + 1) + ' : ' + expectedItemTotal + ' expectedTaxTotal : ' + expectedTaxTotal)
                cy.log('expectedTotal ' + (index + 1) + ' : ' + expectedTotal)
            });
        });

        cy.get('div[class="summary_subtotal_label"]').invoke('text').then((itemTotalText) => {
            const itemTotal = parseFloat(itemTotalText.replace('Item total: $', '').trim());
            expect(itemTotal).to.be.closeTo(expectedItemTotal, 0.01);
        });

        cy.get('div[class="summary_tax_label"]').invoke('text').then((taxTotalText) => {
            const taxTotal = parseFloat(taxTotalText.replace('Tax: $', '').trim());
            expect(taxTotal).to.be.closeTo(expectedTaxTotal, 0.01);
        });

        cy.get('div[class="summary_total_label"]').invoke('text').then((TotalText) => {
            const priceTotal = parseFloat(TotalText.replace('Total: $', '').trim());
            expect(priceTotal).to.be.closeTo(expectedTotal, 0.01);
        });
    }

    clickFinishCheckout() {
        cy.get('button[id="finish"]').contains('Finish').click()
    }

    verifyCheckoutComplete() {
        cy.get('span[class="title"]').should('have.text', 'Checkout: Complete!')
        cy.get('img[alt="Pony Express"]').should('be.visible')
        cy.get('h2[class="complete-header"]').should('have.text', 'Thank you for your order!')
        cy.get('div[class="complete-text"]').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
        cy.get('button[id="back-to-products"]').should('be.visible')
    }
};