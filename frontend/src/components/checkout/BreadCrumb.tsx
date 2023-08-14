import { Paper } from "@mui/material"
import { BackgroundImageStyles, BreadcrumbStyles } from "./styles"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import {NavLink} from "react-router-dom"
import { CheckoutComponentUtils } from "../../utils/constants"
const BreadCrumb = (props: { path: string; name:string }) => (
    <Paper style={BackgroundImageStyles.paperContainer}>
      <Breadcrumbs aria-label="breadcrumb" sx={BreadcrumbStyles}>
        <Link underline="hover" color="inherit" component={NavLink} to="/">
          {CheckoutComponentUtils.BreadCrumbComponent.home}
        </Link>
        <Link sx={{textTransform:'capitalize'}} underline="hover" color="inherit" component={NavLink} to={props.path}>
          {props.name}
        </Link>
      </Breadcrumbs>
    </Paper>
  )
export default BreadCrumb
