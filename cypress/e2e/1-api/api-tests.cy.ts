describe("Test Hakkaren API", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.get("#dbURI").type(
      "mongodb://65cb8ff7c04edaf78fcf47dd_65d4958a6efd64dc8283a927_user:kLIwm*%3ElDD%23b@167.235.55.35:30558/65cb8ff7c04edaf78fcf47dd_65d4958a6efd64dc8283a927?authSource=admin"
    );

    cy.contains("DB is connected").should("not.exist");
    cy.contains("Connect").click();
    cy.contains("DB is connected").should("exist");

    cy.get("li").should("have.length", 0);
    cy.contains("Get users").click();

    cy.get("#auth-token").type(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNiOGZmN2MwNGVkYWY3OGZjZjQ3ZGQiLCJpYXQiOjE3MDgzNjM1MDQsImV4cCI6MTcwODQ0OTkwNH0.PdPb3knV0AnBNrK-OSGjLFj9OAJij_62j-BPSvE8frg"
    );
  });

  it("Check the EXECUTE endpoint", () => {
    cy.get("#url").type(
      "https://api.dev.hakkaren.lastingdynamics.net/v1/inceptors/65d495c76efd64dc8283ad61/execute"
    );
    cy.contains("Execute").click();
    cy.get("#responce").should("not.have.value", "");
    cy.get("ol").then(($list) => {
      const usersNumber = $list.children().length;
      cy.contains("Get users").click();
      cy.get("ol").children().should("have.length.greaterThan", usersNumber);
    });
  });

  it("Check the RESET endpoint", () => {
    cy.get("li").should("have.length.greaterThan", 0);

    const resetURL =
      "https://api.dev.hakkaren.lastingdynamics.net/v1/projects/65d4958a6efd64dc8283a927/databases/reset";
    cy.get("#url").type(resetURL);
    cy.get("#method").select("PUT");
    // _________________________________________________
    cy.get("#payload").type(`{ "resetTo": "initial" }`, {
      parseSpecialCharSequences: false,
    });

    cy.intercept(resetURL).as("execution");
    cy.contains("Execute").click();
    cy.wait("@execution");
    cy.get("ol").then(($list) => {
      const usersNumber = $list.children().length;
      cy.contains("Get users").click();
      cy.get("ol").children().should("not.have.length", usersNumber);
    });
    // _________________________________________________

    cy.get("#payload").clear().type(`{ "resetTo": "empty" }`, {
      parseSpecialCharSequences: false,
    });
    cy.contains("Execute").click();
    cy.wait("@execution");

    cy.contains("Get users").click();

    cy.get("ol").children().should("have.length", 0);
  });
});
