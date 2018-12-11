describe("home", () => {
  it("scrolls the destination into view", () => {
    cy.visit("/");
    cy.contains(`You've reached your destination`).should("not.be.visible");
    cy.get("button")
      .contains("Go")
      .click();
    cy.contains(`You've reached your destination`).should("be.visible");
  });
});
