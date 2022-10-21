describe('workspace-project App', () => {

  let windowErrorSpy;
  Cypress.on('window:before:load', (win) => {
    windowErrorSpy = cy.spy(win.console, 'error');
  });

  const DELAY = 1000;

  afterEach(() => {
    cy.wait(DELAY).then(() => {
      expect(windowErrorSpy).to.not.be.called;
    });
  });

  it('should display welcome message', () => {
    cy.visit('/')
    cy.contains('ngx-scroll-to-demo app is running!');
  });
})
