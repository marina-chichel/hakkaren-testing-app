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

  it("When there is no one in the list then the empty state component is visible", () => {
    // delete all people
    cy.request({
      url: "https://api.dev.app.hakkaren.co/v1/projects/663514aba3ff7dfa67ec0405/databases/reset",
      method: "PUT",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUxZTM3NDEyNDQ2ZTVkNzY0ZjFkYjciLCJpYXQiOjE3MTQ5ODMwNTEsImV4cCI6MTcxNTA2OTQ1MX0.89F-1aPi8jUQnf2AB1ZTDFTqtLeJ_1HndKkKZjy7gvk",
      },
      body: {
        resetTo: "empty",
      },
    })
      .its("body")
      .should("be.an", "object")
      .and("have.property", "success", true);

    cy.reload();
    cy.wait("@connect");
    cy.wait("@fetch");

    cy.contains("NO RECORDS FOUND").should("exist");
  });

  it("The pagination component does not exist when the list is empty, and appears when it is full", () => {
    cy.get('[aria-label="pagination navigation"]').should("not.exist");

    // add 5 people
    cy.request({
      url: "https://api.dev.app.hakkaren.co/v1/inceptors/663514ada3ff7dfa67ec0448/execute",
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUxZTM3NDEyNDQ2ZTVkNzY0ZjFkYjciLCJpYXQiOjE3MTQ5ODMwNTEsImV4cCI6MTcxNTA2OTQ1MX0.89F-1aPi8jUQnf2AB1ZTDFTqtLeJ_1HndKkKZjy7gvk",
      },
      body: {
        configuration: [
          {
            users: {
              rows: 5,
              returned: true,
            },
          },
          {
            contacts: {
              rows: 1,
              returned: true,
            },
          },
        ],
        generateWithAi: false,
      },
    })
      .its("body")
      .should("be.an", "object")
      .and("have.property", "success", true);

    cy.reload();
    cy.wait("@connect");
    cy.wait("@fetch");

    cy.get('[aria-label="pagination navigation"]').should("exist");
  });

  it("The pagination component contains one page for 5 people and 4 pages for 26", () => {
    const authToken = localStorage.getItem("token");
    expect(authToken).not.to.be.null;

    cy.get('[aria-label="pagination navigation"]').should("exist");
    cy.get('[aria-label="pagination navigation"]').within(() => {
      cy.get("ul").children().should("have.length", 3);
    });

    cy.request({
      url: "https://api.dev.app.hakkaren.co/v1/inceptors/663514ada3ff7dfa67ec0448/execute",
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUxZTM3NDEyNDQ2ZTVkNzY0ZjFkYjciLCJpYXQiOjE3MTQ5ODMwNTEsImV4cCI6MTcxNTA2OTQ1MX0.89F-1aPi8jUQnf2AB1ZTDFTqtLeJ_1HndKkKZjy7gvk",
      },
      body: {
        configuration: [
          {
            users: {
              rows: 21,
              returned: true,
            },
          },
          {
            contacts: {
              rows: 1,
              returned: true,
            },
          },
        ],
        generateWithAi: false,
      },
    })
      .its("body")
      .should("be.an", "object")
      .and("have.property", "success", true);
    cy.reload();
    cy.wait("@connect");
    cy.wait("@fetch");

    cy.get('[aria-label="pagination navigation"]').within(() => {
      cy.get("ul").children().should("have.length", 6);
    });
  });

  it("Click on a card should open the info modal", () => {
    cy.get(".user-card").first().click();
    cy.get(".user-info").should("exist");
    cy.get("body").click(0, 0); // click outside
  });

  it("The pagination works: clicking the 4 page  button goes to that page", () => {
    cy.get('[aria-label="pagination navigation"]').should("exist");

    cy.get(".user-list").children().should("have.length", 8);

    cy.get('[aria-label="pagination navigation"]').within(() => {
      cy.get("ul").children().should("have.length", 6);

      cy.contains("4").click();
    });

    cy.get(".user-list").children().should("have.length", 2);
  });

  it("Can delete one entry", () => {
    cy.get('[aria-label="pagination navigation"]').within(() => {
      cy.contains("4").click();
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
