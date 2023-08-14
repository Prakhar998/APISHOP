import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import ProductView from "./ProductView"

test("render Product View", async () => {
  render(<ProductView />)
  fireEvent.mouseOver(screen.getAllByTestId("productview")[0])
  fireEvent.mouseOut(screen.getAllByTestId("productview")[0])
})
