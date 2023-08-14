import DeleteIcon from "@mui/icons-material/Delete";
import { Button, FormControl, Select, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams
} from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import {
  activeUser,
  deleteUser,
  getAllUser,
  inActiveUser,
  makeAdmin,
} from "../../../api/dashboardApis";
import { AppDispatch, RootState } from "../../../redux/store";
import Spinner from "../../common/Spinner";
import DeleteModal from "../Modal/DeleteModal";
import "./style.css";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: number;
  admin: string;
  isAdmin: boolean;
}
const UserDashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userDetail, setuserDetail] = useState([]);
  const [refreshState, setRefreshState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const userFlag = useRef(false);
  const errorMsg = useRef<string>("");
  const deleteId = useRef<string>("");
  const [rows, setRows] = useState();
  const { isAuthenticated, userLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const loggedUserId = useSelector((state: RootState) => state.auth.user.id);
  const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);

  const setAdminHandler = (id: any) => {
    let errorAdminMsg = false;
    userDetail.map((value: User) => {
      if (value.isAdmin === false && value.id === id) {
        errorAdminMsg = true;
      }
      return value;
    });
    dispatch(
      makeAdmin({
        id: id,
        values: errorAdminMsg,
      })
    ).then(() => {
      setRefreshState((prev) => !prev);
    });
  };

  const getRowClassName = (params: any) => {
    if (params.row.id === loggedUserId) {
      return "highlighted-row";
    }
    return "";
  };

  const activeUserHandler = (id: any) => {
    dispatch(activeUser(id)).then(() => {
      setRefreshState((prev) => !prev);
    });
  };

  const inActiveUserHandler = (id: any) => {
    dispatch(inActiveUser(id)).then(() => {
      setRefreshState((prev) => !prev);
    });
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "SI No.",
      width: 80,
      filterable: false,
      renderCell: (params: GridRenderCellParams) =>
        params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: "name",
      headerName: "Name",
      width: 120,
    },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Phone Number", width: 140 },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 140,
      renderCell: (params) => (
        <Typography>
          {params.row.isAdmin === true ? (
            <Typography>Admin</Typography>
          ) : (
            <Typography>User</Typography>
          )}
        </Typography>
      ),
    },
    {
      field: "deleteButton",
      headerName: "Delete",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          onClick={() => {
            {
              console.log(params.row, "params");
            }
            handleModal(params.id);
            userFlag.current = false;
          }}
          color="inherit"
        >
          <DeleteIcon />
        </Button>
      ),
    },
    {
      field: "options",
      headerName: "Options",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Action</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value=""
            label="Options"
            name="options"
            onChange={(e) => {
              e.target.value === "make admin" && setAdminHandler(params.id);
              e.target.value === "unblock user" && activeUserHandler(params.id);
              e.target.value === "Block user" && inActiveUserHandler(params.id);
            }}
          >
            {params?.row?.isAdmin === true ? (
              ""
            ) : (
              <MenuItem value="make admin">Make Admin</MenuItem>
            )}
            {<MenuItem value="unblock user">Active User</MenuItem>}
            <MenuItem value="Block user">InActive User</MenuItem>
          </Select>
        </FormControl>
      ),
    },
  ];

  const handleDeleteUser = (id: { current: string }) => {
    dispatch(deleteUser(id.current))
      .then((res: any) => {
        if (res.payload.customMessage) {
          errorMsg.current = res.payload.customMessage;
        }

        setRefreshState((prev) => !prev);
      })
      .then(() => {
        userFlag && !errorMsg.current
          ? toast.success(
              <>
                User Deleted Succesfully{" "}
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "#fff",
                    border: "none",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                ></button>
              </>
            )
          : errorMsg.current &&
            toast.error(
              <>
                {errorMsg.current}
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "#fff",
                    border: "none",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                ></button>
              </>
            );
      });
    setShowModal(!showModal);
  };
  const handlePageChange = (e: any) => {
    dispatch(getAllUser(e.page)).then((res: any) => {
      if (res.payload.success === true) {
        setuserDetail(res.payload.data);
      }
    });
  };
  const handleModal = (id: any) => {
    deleteId.current = id;
    setShowModal(!showModal);
  };
  useEffect(() => {
    dispatch(getAllUser(0)).then((res: any) => {
      if (res.payload.success === true) {
        setRows(res.payload.paginationInfo.totalRecords);
        setuserDetail(res.payload.data);
      }
    });
  }, [refreshState, dispatch]);
  const closeModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      {userDetail.length === 0 || userLoading ? (
        <Spinner />
      ) : !isAuthenticated && isAdmin ? (
        <Navigate to="/login" />
      ) : (
        <div style={{ marginTop: 80, padding: "0 40px 0 40px " }}>
          <DeleteModal
            showModal={showModal}
            closeModal={closeModal}
            userFlag={userFlag}
            errorMsg={errorMsg.current}
            handleClose={() => handleDeleteUser(deleteId)}
          />
          <div style={{ height: 650 }}>
            <h1>Users</h1>
            <DataGrid
              disableRowSelectionOnClick
              {...userDetail}
              rows={userDetail}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              paginationMode="server"
              rowCount={rows}
              getRowClassName={getRowClassName}
              onPaginationModelChange={handlePageChange}
            />
          </div>
        </div>
      )}
      <div></div>
    </>
  );
};

export default UserDashBoard;
