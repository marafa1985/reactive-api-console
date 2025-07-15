describe("Highlighting", () => {
  beforeEach(() => {
    cy.visit("/");
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

  it("should filter results globally", () => {
    // First execute some commands to get results
    cy.intercept("GET", "https://catfact.ninja/fact", {
      body: { fact: "Cats are amazing animals" },
    }).as("getCatFact");

    cy.get('input[placeholder*="Type a command"]').type("get cat fact");
    cy.get("button").contains("Send").click();
    cy.wait("@getCatFact");

    cy.get(":nth-child(1) > .panel-tab").click();
    // Now test global search
    cy.get('input[placeholder*="Filter results in this panel..."]').type(
      "amazing"
    );

    // Results should be filtered
    cy.get("li > .p-4").contains("amazing").should("be.visible");
  });
});
