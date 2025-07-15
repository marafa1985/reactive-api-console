/// <reference types="cypress" />

describe("History Commands", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show No history when 'history' command is executed without any history", () => {
    //  check history
    cy.get('input[placeholder*="Type a command"]').type("history");
    cy.get("button").contains("Send").click();
    cy.contains("No command").should("be.visible");
  });

  it("should show command history when 'history' command is executed", () => {
    // Execute a command to ensure there is history
    cy.get('input[placeholder*="Type a command"]').type("get chuck joke");
    cy.get("button").contains("Send").click();

    cy.get('input[placeholder*="Type a command"]').type("history");
    cy.get("button").contains("Send").click();

    cy.get('input[placeholder*="Type a command"]').type("get activity");
    cy.get("button").contains("Send").click();

    // Now check history
    cy.get('input[placeholder*="Type a command"]').type("history");
    cy.get("button").contains("Send").click();
    cy.contains("Command History").should("be.visible");
  });
});
