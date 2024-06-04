import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Main from "./Main";
import axios from "axios";

jest.mock("axios");
const mockedAxios = jest.MockedFunction<typeof axios>

// This test does NOT pass - unclear why. It apepars to have something to do with an unresolved axios call.
// describe("Main Component", () => {
// 	it("renders the component", () => {
//         const user = { stringId: "someId" };
// 	    localStorage.setItem("user", JSON.stringify(user));
// 		render(<Main />);
// 		expect(screen.getByText("DASHBOARD")).toBeInTheDocument();
// 	});
// });
