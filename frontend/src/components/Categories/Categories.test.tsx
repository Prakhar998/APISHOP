import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import Categories from "./Categories"

describe("Categories component", () => {
  test("render Catagories Component", () => {
    const route = "/product-category"
    render(
        <MemoryRouter initialEntries={[route]} ><Categories/></MemoryRouter>)
  })
})
