import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import LatestProduct from "./LatestProduct"

describe("LatestProduct component", () => {
  test("render Latest Product Component", () => {
    const route = "/product-details"
    render(
        <MemoryRouter initialEntries={[route]} ><LatestProduct/></MemoryRouter>)

    fireEvent.mouseOver(screen.getAllByTestId("ProductList")[0])
    fireEvent.mouseOut(screen.getAllByTestId("ProductList")[0])
  })
})
