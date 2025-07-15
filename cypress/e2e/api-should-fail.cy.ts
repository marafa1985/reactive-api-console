/// <reference types="cypress" />

describe("API Failing Cases", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show error for unsupported command", () => {
    cy.get('input[placeholder*="Type a command"]').type("unsupported command");
    cy.get("button").contains("Send").click();
    cy.contains("No results for").should("be.visible");
  });

  it("should show error if command is valid but API is disabled", () => {
    cy.get('[data-testid="open-sidebar-btn"]').click();
    // Assume Cat Facts is enabled by default, so we disable it first
    cy.contains("Cat Facts").click(); // This should disable the API
    cy.contains("Cat Facts").parent().not("have.class", "ring-orange-500");
    cy.get('input[placeholder*="Type a command"]').type("get cat fact");
    cy.get("button").contains("Send").click();
    cy.contains("No results for").should("be.visible");
  });

  it("should show error if network/API is down (network failure)", () => {
    cy.intercept("GET", "https://catfact.ninja/fact", {
      forceNetworkError: true,
    }).as("getCatFactFail");
    cy.get('input[placeholder*="Type a command"]').type("get cat fact");
    cy.get("button").contains("Send").click();
    cy.wait("@getCatFactFail");
    cy.contains("Network error").should("be.visible");
  });

  it("should show error if API returns 500 error", () => {
    cy.intercept("GET", "https://catfact.ninja/fact", {
      statusCode: 500,
      body: {},
    }).as("getCatFact500");
    cy.get('input[placeholder*="Type a command"]').type("get cat fact");
    cy.get("button").contains("Send").click();
    cy.wait("@getCatFact500");
    cy.contains("Error executing").should("be.visible");
  });
});
