describe("Test Hakkaren API", () => {
  beforeEach(() => {
    cy.intercept("http://localhost:3000/connect-to-mongodb").as("connect");
    cy.intercept("http://localhost:3000").as("fetch");
    cy.intercept("http://localhost:3000/execute").as("execute");
    cy.intercept("http://localhost:3000/reset").as("reset");

    cy.visit("/");
    cy.pause();
  });

  afterEach(() => {
    cy.pause();
  });

  it("Fetch and Populate table", () => {
    cy.wait("@connect");
    cy.contains("Fetch other users").should("not.be.disabled");
    cy.wait("@fetch");
    cy.get("body").then(($body) => {
      if ($body.find("tbody").length > 0) {
        cy.get("tbody").then(($table) => {
          const usersNumber = $table.children().length;
          cy.log(`${usersNumber} records found.`);
          cy.contains("Fetch other users").click();
          cy.wait("@execute", { timeout: 30000 });
          cy.get("tbody")
            .children()
            .should("have.length.greaterThan", usersNumber);
        });
      } else {
        cy.log("No records found.");
        cy.contains("Fetch other users").click();
        cy.wait("@execute", { timeout: 30000 });
        cy.get("tbody").children().should("have.length.greaterThan", 0);
      }
    });
  });

  it("Delete single record", () => {
    cy.get("tbody").then(($table) => {
      const usersNumber = $table.children().length;
      cy.log(`${cy.get('[data-testid="DeleteIcon"]')}`);
      cy.get('[data-testid="DeleteIcon"]')
        .first()
        .click()
        .then(() => {
          cy.get("tbody")
            .children()
            .should("have.length", usersNumber - 1);
        });
    });
  });

  it("Delete All records", () => {
    cy.contains("Delete All").should("not.be.disabled");
    cy.contains("Delete All").click();
    cy.wait("@reset");
    cy.contains("NO RECORDS FOUND").should("exist", { timeout: 10000 });
  });
});
