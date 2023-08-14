import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getAllCategories } from "../../../api/dashboardApis";

const DashBoardCategoryProduct = (props: any) => {
  //const { difference, positive = false, sx } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [totalCategories, setTotalCategories] = useState(0);
  useEffect(() => {
    dispatch(getAllCategories()).then((res:any) => {
      setTotalCategories(res?.payload?.data?.data.length);
    });
  }, []);
  return (
    <Card sx={props.sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              sx={{ fontWeight: "bold" }}
              color="text.secondary"
              variant="overline"
            >
              Product Category
            </Typography>
            <Typography variant="h4">{totalCategories}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "#002D62",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CategoryIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {/* {difference && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? "success.main" : "error.main"}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="caption">
              Since last month
            </Typography>
          </Stack>
        )} */}
      </CardContent>
    </Card>
  );
};

export default DashBoardCategoryProduct;
