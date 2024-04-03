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

  it("The pagination component does not exist when the list is empty, and appears when it is full", () => {
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

  it("The pagination component contains one page for 5 people and 2 pages for 10", () => {
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

  it("Click on a card should open the info modal", () => {
    cy.get(".user-card").first().click();
    cy.get(".user-info").should("exist");
    cy.get("body").click(0, 0); // click outside
  });

  it("The pagination works: clicking in the second page  button goes to that page", () => {
    cy.get('[aria-label="pagination navigation"]').should("exist");

    cy.get(".user-list").children().should("have.length", 8);

    cy.get('[aria-label="pagination navigation"]').within(() => {
      cy.get("ul").children().should("have.length", 4);

      cy.contains("2").click();
    });

    cy.get(".user-list").children().should("have.length", 2);
  });

  it("Can delete one entry", () => {
    cy.get('[aria-label="pagination navigation"]').within(() => {
      cy.contains("2").click();
    });

    cy.get(".user-list").then(($list) => {
      const usersNumber = $list.children().length;

      cy.get('[data-testid="DeleteIcon"]').first().click();

      cy.contains("Delete").click();

      cy.get(".user-list")
        .children()
        .should("have.length", usersNumber - 1);
    });
  });

  it("Search works", () => {
    cy.get(".position")
      .first()
      .then(($position) => {
        const userPosition = $position.first().text();

        cy.get(`input[placeholder="Search..."]`).type(userPosition, {
          delay: 100,
        });
      });

    cy.get(".position").should("have.length", 1);
  });
});
