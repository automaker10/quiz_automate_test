
import { sauceDemoPages } from '../../pages/sauceDemoPages/sauceDemoPages';

const saucedemoPages = new sauceDemoPages();
let standard_user, locked_out_user, problem_user, performance_glitch_user, error_user, visual_user, secret_sauce
let firstname, lastname, zipcode

describe('Login User With Account', () => {
  beforeEach(function () {
    cy.visit('https://www.saucedemo.com/')
    cy.fixture('userKeyword').then((td) => {
      standard_user = td[0].username
      firstname = td[0].firstname
      lastname = td[0].lastname
      zipcode = td[0].zipcode
      locked_out_user = td[1].username
      problem_user = td[2].username
      performance_glitch_user = td[3].username
      error_user = td[4].username
      visual_user = td[5].username
      secret_sauce = td[0].password
      // cy.log('standard_user');
    })
  })

  it.only('Login user with standard_user and payment success', function () {
    saucedemoPages.verifyTitleSwagLabs()
    cy.loginUser(standard_user, secret_sauce)
    saucedemoPages.verifyLoginSuccess()
    saucedemoPages.clickAddProduct()
    saucedemoPages.clickIconCart()
    saucedemoPages.clickRemoveProduct('Backpack')
    saucedemoPages.clickCheckoutButton()
    saucedemoPages.verifyPageCheckoutInfo()
    cy.checkoutInformation(firstname, lastname, zipcode)
    saucedemoPages.clickSubmitCheckout()
    saucedemoPages.calculateTotalTax()
    saucedemoPages.clickFinishCheckout()
    saucedemoPages.verifyCheckoutComplete()
  })
})
