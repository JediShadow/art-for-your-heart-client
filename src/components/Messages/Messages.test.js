import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Messages from "./Messages";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

describe("Messages Component", () => {
	it("renders the component with matches", () => {
		const matches = [
			{ stringId: "1", name: "John Doe", artPhotos: ["photo1.jpg"] },
			{ stringId: "2", name: "Jane Smith", artPhotos: ["photo2.jpg"] },
		];
		render(<Messages matches={matches} />);
		expect(screen.getByText("MESSAGES")).toBeInTheDocument();
		expect(
			screen.getByText("Open messages with John Doe")
		).toBeInTheDocument();
		expect(
			screen.getByText("Open messages with Jane Smith")
		).toBeInTheDocument();
	});

	it("displays messages when a match is selected", async () => {
		const match = {
			stringId: "1",
			name: "John Doe",
			artPhotos: ["photo1.jpg"],
		};
		const messages = [
			{ senderId: "1", content: "Hello", timestamp: "" },
			{ senderId: "2", content: "Hi", timestamp: "" },
		];
		axios.get.mockResolvedValueOnce({ data: messages });
		render(<Messages matches={[match]} />);
		fireEvent.click(screen.getByText("Open messages with John Doe"));
		await waitFor(() => {
			expect(
				screen.getByText("Messages with John Doe")
			).toBeInTheDocument();
		});
	});

    it('sends a message', async () => {
        const matches = [
          { stringId: '1', name: 'John Doe', artPhotos: ['photo1.jpg'] }
        ];
        render(<Messages matches={matches} />);
        // Click on a match to open the message thread
        fireEvent.click(screen.getByText('Open messages with John Doe'));
        // Type a message in the textarea
        const textarea = screen.getByPlaceholderText('Type a message here');
        fireEvent.change(textarea, { target: { value: 'Hello' } });
        // Click the send button
        const sendButton = screen.getByText('Send');
        fireEvent.click(sendButton);
        // Wait for the message to appear
        await screen.findByText(/Hello/);
        expect(screen.getByText('Hello')).toBeInTheDocument();
      });
});
