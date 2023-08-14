import Button from "@mui/material/Button"
import TableCell from "@mui/material/TableCell"
import { styled } from "@mui/material/styles"
import BreadcrumbImg from "./../../assets/background_img/breadcumb.jpg"
const PriceText = styled("div")({
  float: "right",
  paddingRight: 200,
  paddingBottom: 20,
  fontWeight: "bold"
})
const DeleteButton = styled(Button)({
  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
})
const TableCellWidth = styled(TableCell)({
  width: "10%"
})
const BackgroundImageStyles = {
  paperContainer: {
    backgroundImage: `url(${BreadcrumbImg})`,
    paddingTop: "10%",
    paddingBottom: "10%",
    backgroundSize: "cover"
  }
}
const BreadcrumbStyles = {
  fontWeight: "bold",
  fontSize: "20px",
  paddingLeft: "15%"
}
const ImageSize = {
  width: 100,
  height: 100
}
export {
  PriceText,
  DeleteButton,
  TableCellWidth,
  BackgroundImageStyles,
  BreadcrumbStyles,
  ImageSize
}
