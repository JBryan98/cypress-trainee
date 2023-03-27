class AmazonPage {
  elements = {
    logoAmazon: () => cy.get("#nav-logo-sprites"),
    searchAmazon: () => cy.get("#twotabsearchtextbox"),
    buttonSearch: () => cy.get("#nav-search-submit-button"),
    chooseProduct: () => cy.get("#nav-flyout-searchAjax"),
    numberPage: () => cy.get(".s-pagination-strip"),
    item: () =>
      cy.get(".s-card-container > .a-section > .sg-row > .s-list-col-left"),
    message: () => cy.get("#availability > span"),
  };

  validatePage() {
    this.elements.logoAmazon().should("be.visible");
  }
  searchProduct(products) {
    this.elements.searchAmazon().click().type(products);
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
  selectThirdItem() {
    this.elements.item().each(($li, index) => {
      if (index === 2) cy.wrap($li).click();
    });
  }
  confirmMessage(message) {
    this.elements.message().should("contain", message);
  }
}

export default new AmazonPage();
