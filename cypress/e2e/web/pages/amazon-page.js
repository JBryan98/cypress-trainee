class AmazonPage {
  elements = {
    logoAmazon: () => cy.get("#nav-logo-sprites"),
    searchAmazon: () => cy.get("#twotabsearchtextbox"),
    buttonSearch: () => cy.get("#nav-search-submit-button"),
    chooseProduct: () => cy.get("#nav-flyout-searchAjax"),
    chooseProductList: () => cy.get(".s-suggestion"),
    numberPage: () => cy.get(".s-pagination-strip"),
    item: () =>
      cy.get(".s-card-container > .a-section > .sg-row > .s-list-col-left"),
    message: () => cy.get("#availability > span"),
  };

  validatePage() {
    this.elements.logoAmazon().should("be.visible");
  }
  searchProduct(products) {
    this.elements.searchAmazon().click().type(products).wait(2000);
  }

  selectProduct(product) {
    this.elements
      .chooseProduct()
      .should("contain", product)
      .contains(product)
      .click();
  }
  browserPage(number) {
    this.elements
      .numberPage()
      .should("contain", number)
      .contains(number)
      .click();
  }

  selectOption(product) {
    cy.wait(1000);
    this.elements.chooseProductList().each(($el) => {
      if ($el.text() === product) {
        cy.wrap($el).click();
        return false;
      }
    });
  }

  selectThirdItem() {
    this.elements.item().each(($li, index) => {
      if (index === 2) {
        cy.wrap($li).click();
        return false;
      }
    });
  }
  confirmMessage(message) {
    this.elements.message().should("contain", message);
  }
}

export default new AmazonPage();
