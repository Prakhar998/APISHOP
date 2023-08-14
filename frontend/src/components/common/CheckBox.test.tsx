import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CheckBox from "./CheckBox";

test("loads and displays Checkbox", async () => {
  render(<CheckBox color="#e83e8c" />);
  fireEvent.click(screen.getByTestId("box"));
});
