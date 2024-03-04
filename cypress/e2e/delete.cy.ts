describe("Delete", () => {
	it("Delete Note", () => {
		cy.visit("http://localhost:3000/");

		cy.get('[href="/new"] > .navbar-item').click();
		cy.get(".navbar-title").should("exist");
		cy.get(".title-input").type("title 1");
		cy.get(".markdown-input").type("markdown 1");
		cy.get(".save-btn").click();

		cy.get(".note-item").click();

		cy.get(".note-option-items > :nth-child(2)").click();
		cy.get(".note-item").should("have.length", 0);
	});

	it("Delete Note with tags", () => {
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

		cy.get(".note-option-items > :nth-child(2)").click();
		cy.get(".note-item").should("have.length", 0);
	});
});
