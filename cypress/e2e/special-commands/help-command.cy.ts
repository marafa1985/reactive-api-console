/// <reference types="cypress" />

describe("Help Commands", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display help information when 'help' command is executed", () => {
    cy.get('input[placeholder*="Type a command"]').type("help");
    cy.get("button").should("not.be.disabled");
    cy.get("button").contains("Send").click();
    cy.contains("Available Commands").should("be.visible");
  });
});
