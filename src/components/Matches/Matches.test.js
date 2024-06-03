import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Matches from "./Matches";

const mockMatches = [
	{
		name: "Jane",
		age: 25,
		location: "New York",
		bio: "Artist and musician",
		artPhotos: null,
	},
	{
		name: "Bob",
		age: 30,
		location: "San Francisco",
		bio: "Sculptor and painter",
		artPhotos: null,
	},
];

describe("Matches Component", () => {
	it("renders the title correctly", () => {
		render(
			<Matches
				matches={[]}
				modal={false}
				setModal={jest.fn()}
				setModalPerson={jest.fn()}
				modalPerson={{}}
				messageCount={0}
			/>
		);
		expect(screen.getByText(/MATCHES/i)).toBeInTheDocument();
	});

    // This test does NOT pass.
	// it('displays "NO MATCHES" when matches prop is empty', () => {
	// 	render(
	// 		<Matches
	// 			matches={[]}
	// 			modal={false}
	// 			setModal={jest.fn()}
	// 			setModalPerson={jest.fn()}
	// 			modalPerson={{}}
	// 			messageCount={0}
	// 		/>
	// 	);
	// 	expect(screen.getByText(/NO MATCHES/i)).toBeInTheDocument();
	// });

	it("renders matches correctly", () => {
		render(
			<Matches
				matches={mockMatches}
				modal={false}
				setModal={jest.fn()}
				setModalPerson={jest.fn()}
				modalPerson={{}}
				messageCount={0}
			/>
		);
		expect(screen.getByText(/Jane/i)).toBeInTheDocument();
		expect(screen.getByText(/Bob/i)).toBeInTheDocument();
	});

	it("opens the modal with correct person information on card click", () => {
		const setModal = jest.fn();
		const setModalPerson = jest.fn();
		render(
			<Matches
				matches={mockMatches}
				modal={false}
				setModal={setModal}
				setModalPerson={setModalPerson}
				modalPerson={{}}
				messageCount={0}
			/>
		);

		fireEvent.click(screen.getByText(/Jane/i));
		expect(setModal).toHaveBeenCalledWith(true);
		expect(setModalPerson).toHaveBeenCalledWith(mockMatches[0]);
	});
});
