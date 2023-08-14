import { Box } from "@mui/system"
import DashBoardPage from "../DashBoardPage"

function DashBoardLayout () {
  return (
    <>
      <Box style={{ display: "flex" }} className="dashboard-layout">
        <DashBoardPage />
      </Box>
    </>
  )
}

export default DashBoardLayout
