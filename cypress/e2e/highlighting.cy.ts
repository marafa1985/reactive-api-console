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

    // Now test global search
    cy.get(".input-search").type("amazing");

    // Results should be filtered
    cy.contains("Cat Facts").click();
    cy.contains("cat").should("be.visible");
  });
});
