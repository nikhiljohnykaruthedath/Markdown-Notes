describe("View", () => {
	it("View New Note", () => {
		cy.visit("http://localhost:3000/");

		cy.get('[href="/new"] > .navbar-item').click();
		cy.get(".navbar-title").should("exist");
		cy.get(".title-input").type("title 1");
		cy.get(".markdown-input").type("markdown 1");
		cy.get(".save-btn").click();

		cy.get(".note-item").click();

		cy.get("a > .note-option-item").should("exist");
		cy.get(".note-option-items > :nth-child(2)").should("exist");
		cy.get(".note-title").should("contain", "title 1");
		cy.get("p").should("contain", "markdown 1");
	});

	it("View New Note with tags", () => {
		cy.visit("http://localhost:3000/");

		cy.get('[href="/new"] > .navbar-item').click();
		cy.get(".navbar-title").should("exist");
		cy.get(".title-input").type("title 1");
		cy.get(".markdown-input").type("markdown 1");
		cy.get(".css-ujecln-Input2").type("tag 1").trigger("keydown", {
			key: "Enter",
		});
		cy.get(".save-btn").click();

		cy.get(".note-item").click();

		cy.get("a > .note-option-item").should("exist");
		cy.get(".note-option-items > :nth-child(2)").should("exist");
		cy.get(".show-note-tag-list-item").should("contain", "tag 1");
		cy.get(".note-title").should("contain", "title 1");
		cy.get("p").should("contain", "markdown 1");
	});
});
