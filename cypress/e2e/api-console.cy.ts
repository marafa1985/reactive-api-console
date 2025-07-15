/// <reference types="cypress" />

describe("Reactive API Console", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the main interface", () => {
    cy.contains("Reactive API Console").should("be.visible");
    cy.contains("Chat Console").should("be.visible");
    cy.contains("Available API").should("be.visible");
  });

  it("should execute help command", () => {
    cy.get('input[placeholder*="Type a command"]').type("help");
    cy.get("button").contains("Send").click();

    cy.contains("Available Commands").should("be.visible");
    cy.get(".message-system > .items-start > .flex-1 > .whitespace-pre-wrap")
      .contains("get cat fact")
      .should("be.visible");
  });

  it("should toggle API activation", () => {
    cy.get('[data-testid="open-sidebar-btn"]').click();
    cy.get('[data-testid="api-list-item-cat-facts"]').should(
      "have.class",
      "ring-orange-500"
    );
    cy.contains("Cat Facts").click();
    cy.get('[data-testid="api-list-item-cat-facts"]').not(
      "have.class",
      "ring-orange-500"
    );
  });

  it("should execute cat fact command", () => {
    cy.intercept("GET", "https://catfact.ninja/fact", {
      fixture: "cat-fact.json",
    }).as("getCatFact");

    cy.get('input[placeholder*="Type a command"]').type("get cat fact");
    cy.get("button").contains("Send").click();

    cy.wait("@getCatFact");
    cy.contains("✅ Executed: get cat fact").should("be.visible");
  });
});
