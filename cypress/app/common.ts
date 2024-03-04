export function create3NewNotes() {
	cy.get('[href="/new"] > .navbar-item').click();
	cy.get(".navbar-title").should("exist");
	cy.get(".title-input").type("title 1");
	cy.get(".markdown-input").type("markdown 1");
	cy.get(".css-ujecln-Input2").type("tag 1").trigger("keydown", {
		key: "Enter",
	});
	cy.get(".save-btn").click();

	cy.get(".note-item").should("have.length", 1);

	cy.get('[href="/new"] > .navbar-item').click();
	cy.get(".navbar-title").should("exist");
	cy.get(".title-input").type("title 2");
	cy.get(".markdown-input").type("markdown 2");
	cy.get(".css-ujecln-Input2").type("tag 2").trigger("keydown", {
		key: "Enter",
	});
	cy.get(".save-btn").click();

	cy.get(".note-item").should("have.length", 2);

	cy.get('[href="/new"] > .navbar-item').click();
	cy.get(".navbar-title").should("exist");
	cy.get(".title-input").type("title 3");
	cy.get(".markdown-input").type("markdown 3");
	cy.get(".css-ujecln-Input2").type("tag 1").trigger("keydown", {
		key: "Enter",
	});
	cy.get(".css-ujecln-Input2").type("tag 2").trigger("keydown", {
		key: "Enter",
	});
	cy.get(".save-btn").click();

	cy.get(".note-item").should("have.length", 3);
}
