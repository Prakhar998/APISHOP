import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ProductFilter } from "./ProductFilter"

test("render product filter", async () => {
  render(<ProductFilter />)
  const mark = screen.getByTestId("slider")
  fireEvent.mouseDown(mark, { clientX: 5, clientY: 7 })
})
