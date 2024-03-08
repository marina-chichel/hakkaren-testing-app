import { resetURL, executeURL, generateWithAI } from "../../../api-settings";

describe("Test Hakkaren API", () => {
  beforeEach(() => {
    cy.intercept("http://localhost:3000/connect-to-mongodb").as("connect");
    cy.intercept("http://localhost:3000").as("fetch");
    // cy.intercept("http://localhost:3000/execute").as("execute");
    // cy.intercept("http://localhost:3000/reset").as("reset");

    cy.visit("/");
    cy.contains("Continue with Email").click();
    cy.wait("@connect");
    cy.wait("@fetch");
    cy.pause();
  });

  afterEach(() => {
    // cy.pause();
  });

  it("Crear users list", () => {
    const authToken = localStorage.getItem("token");
    expect(authToken).not.to.be.null;

    cy.request("PUT", "http://localhost:3000/reset", {
      resetURL,
      authToken,
    })
      .its("body")
      .should("be.an", "object")
      .and("have.property", "success", true);
    cy.reload();
    cy.wait("@connect");
    cy.wait("@fetch");

    cy.contains("NO RECORDS FOUND").should("exist");

    cy.request("POST", "http://localhost:3000/execute", {
      executeURL,
      authToken,
      generateWithAI,
    })
      .its("body")
      .should("be.an", "object")
      .and("have.property", "success", true);
    cy.reload();
    cy.wait("@connect");
    cy.wait("@fetch");

    cy.contains("Hourly rate").should("exist");
  });
});
