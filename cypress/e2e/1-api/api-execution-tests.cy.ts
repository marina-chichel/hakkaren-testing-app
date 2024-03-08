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
    // cy.pause();
  });

  afterEach(() => {
    // cy.pause();
  });

  it("The pagination component does not exist when the user list is empty, and appears when it is full", () => {
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
    cy.get('[aria-label="pagination navigation"]').should("not.exist");

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

    cy.get('[aria-label="pagination navigation"]').should("exist");
  });

  it("The pagination component contains one page for 5 users and 2 for 10", () => {
    const authToken = localStorage.getItem("token");
    expect(authToken).not.to.be.null;

    cy.get('[aria-label="pagination navigation"]').should("exist");
    cy.get('[aria-label="pagination navigation"]').within(() => {
      cy.get("ul").children().should("have.length", 3);
    });

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

    cy.get('[aria-label="pagination navigation"]').within(() => {
      cy.get("ul").children().should("have.length", 4);
    });
  });

  it("Clicking the first card should show the user's modal", () => {
    const authToken = localStorage.getItem("token");
    expect(authToken).not.to.be.null;

    cy.get(".user-card").first().click();
    cy.get(".user-info").should("exist");
    cy.get("body").click(0, 0); // click outside
  });
});
