import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";

test("render product filter", async () => {
  render(<LoginForm />);
  fireEvent.change(screen.getByTestId("input1"), {
    target: { value: "exampleuser" },
  });
  fireEvent.change(screen.getByTestId("input2"), {
    target: { value: "password123" },
  });
  fireEvent.click(screen.getByTestId("input3"));
});
