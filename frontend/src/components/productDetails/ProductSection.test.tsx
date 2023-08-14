import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import ProductSection from "./ProductSection"

test("displays details product section", async () => {
  render(<ProductSection/>)
  fireEvent.click(screen.getByTestId("add"))
  fireEvent.click(screen.getByTestId("minus"))
})
