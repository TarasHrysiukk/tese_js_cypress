import 'cypress-xpath';

let youHaveDups = "You have duplicates"
let notDuplicate = "not a duplicate"

beforeEach(() => {
  cy.visit('http://drupal8/')
  cy.get("a[href='/user/login']").should("be.visible").click()

  cy.url().should('include', '/user/login')
  cy.get("input[name='name']").should("be.visible").click().type("admin")
  cy.get("input[name='pass']").should("be.visible").click().type("admin")
  cy.get("input[value='Log in']").should("be.visible").click()
  cy.url().should('include', '/user/1')
  cy.xpath("//li[contains(@class, 'menu-item')]/a[contains(@href, '/node/add')]").should("be.visible").click()


  cy.url().should('include', '/node/add')
  cy.get("a[href='/node/add/article']").should("be.visible").click()
  cy.url().should('include', '/node/add/article')
});

describe('Admin should see anti-dublicates side bar without any dups', () => {
  it('Check if sidebar present and have text', () => {
    // cy.xpath("//div[contains(@id, 'dw_container')]").should("be.visible").contains("Help us reduce the chance of duplicated content, if we find content that is similar or related to the one you are posting it will be listed below :")
    cy.get("details[data-drupal-selector='edit-anti-duplicates']").scrollIntoView().should("be.visible")
    cy.get("div[id='dw_container']").scrollIntoView().should("contain", youHaveDups)
    cy.get("a[id='dw-enable-form']").should("not.exist")
  })
})

describe('Check present dublication detecting', () => {
  it('Check if sidebar present and have duplicates', () => {

    cy.get("input[id='edit-title-0-value']").should("be.visible").type('test ',{ force: true })
    cy.get("div[id='cke_1_contents']").should("be.visible").click()
    cy.xpath("//span[contains(@id, 'dw-total')]/b").should("contain","3")
    cy.get("a[id='dw-enable-form']").should("contain.text", notDuplicate)

  })
})

describe('Check no any dups', () => {
  it('Check no any dups', () => {

    cy.get("input[id='edit-title-0-value']").should("be.visible").type(' ',{ force: true })
    cy.get("div[id='cke_1_contents']").should("be.visible").click()
    cy.get("a[id='dw-enable-form']").should("not.exist")

    scrollTo(0,15)
    cy.get("input[id='edit-title-0-value']").should("be.visible").type('TarasHrysiuk',{ force: true })
    cy.get("div[id='cke_1_contents']").should("be.visible").click()
    cy.get("a[id='dw-enable-form']").should('be.hidden')
  })
})

describe('Click on not a duplicate button', () => {
  it('Click on not a duplicate button', () => {

    cy.get("input[id='edit-title-0-value']").should("be.visible").type('test ',{ force: true })
    cy.get("div[id='cke_1_contents']").should("be.visible").click()
    scrollTo(0,-15)
    cy.get("a[id='dw-enable-form']").should("be.visible").click({ force: true })
    cy.get("a[id='dw-enable-form']").should('be.hidden')
  })
})