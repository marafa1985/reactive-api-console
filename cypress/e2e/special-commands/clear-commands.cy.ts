/// <reference types="cypress" />

describe("Clear Commands", () => {
  it("should clear chat when 'clear' command is executed", () => {
    cy.visit("/");
    // Execute a command to populate chat
    cy.get('input[placeholder*="Type a command"]').type("get cat fact");
    cy.get("button").contains("Send").click();
    cy.contains("✅ Executed: get cat fact").should("be.visible");

    cy.get('input[placeholder*="Type a command"]').type("clear");
    cy.get("button").contains("Send").click();
    // The chat should be cleared, so the executed message should not be visible
    cy.contains("✅ Executed: get cat fact").should("not.exist");
  });
});
