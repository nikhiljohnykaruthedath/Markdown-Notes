import { create3NewNotes } from "../app/common";

describe("Search", () => {
	it("search notes by title", () => {
		cy.visit("http://localhost:3000/");

		create3NewNotes();

		cy.get(".title-input").type("title 3");
		cy.get(".note-item").should("have.length", 1);
		cy.get(":nth-child(1) > a > .note-item > .note-title").should(
			"contain",
			"title 3"
		);
		cy.get(
			":nth-child(1) > a > .note-item > .note-tag-list > .tag-item"
		).should("have.length", 2);
	});

	it("search notes by tags", () => {
		cy.visit("http://localhost:3000/");

		cy.visit("http://localhost:3000/");

		create3NewNotes();

		cy.get(".css-ujecln-Input2").type("tag 2").trigger("keydown", {
			key: "Enter",
		});
		cy.get(".note-item").should("have.length", 2);

		cy.get(".css-ujecln-Input2").type("tag 1").trigger("keydown", {
			key: "Enter",
		});
		cy.get(".note-item").should("have.length", 1);
	});
});
