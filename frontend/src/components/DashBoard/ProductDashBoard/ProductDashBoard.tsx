import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../Modal/DeleteModal";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { deleteProduct, displayAllProducts } from "../../../api/dashboardApis";
import { AppDispatch, RootState } from "../../../redux/store";
import Spinner from "../../common/Spinner";
import Modal from "../Modal/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ImageUpload from "./ImageUpload";
import "./imagestyle.css";

interface AutopopulatingData {
  name: string;
  description: string;
  price: number;
  ratings: number;
  stock: number;
  category: object;
}

const ProductDashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [allProductsState, setAllProductsState] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [refreshState, setRefreshState] = useState(false);
  const deleteId = useRef<string>("");
  const whichModal = useRef(false);
  const [imageData, setImageData] = useState();
  const [imageModal, setImageModal] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(null);

  const { isAuthenticated, userLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const prePopulatedDataForModal = useRef<AutopopulatingData | object>({});
  const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);

  const handleAddEntries = () => {
    setModalOpen(!isModalOpen);
    setRefreshState((prev) => !prev);
  };
  const handleDeleteProduct = (id: { current: string }) => {
    dispatch(deleteProduct(id.current))
      .then(() => {
        setRefreshState((prev) => !prev);
      })
      .then(() => {
        toast.success(
          <>
            Product Deleted Succesfully{" "}
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

  const handleModal = (id: any) => {
    deleteId.current = id;
    setShowModal(!showModal);
  };

  const closeImageModal = () => {
    setImageModal(!imageModal);
  };

  const closeModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(displayAllProducts()).then((res) => {
      if (res.payload.success === true) {
        console.log(res.payload.data);
        setAllProductsState(res.payload.data);
      }
    });
  }, [refreshState, dispatch]);
  
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "SI No.",
      width: 40,
      filterable: false,
      renderCell: (params: GridRenderCellParams) =>
        params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    { field: "name", headerName: "Name", width: 160 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      valueGetter: (params) => params.row.category.title,
    },
    { field: "price", headerName: "Price", width: 100 },
    {
      field: "fileupload",
      headerName: "Upload Image",
      width: 120,
      renderCell: (params: any) =>
        params.row.images.length > 0 ? (
          <Box
            onMouseEnter={() => setHoverBtn(params.row.id)}
            onMouseLeave={() => setHoverBtn(null)}
            sx={{ position: "relative" }}
          >
            {hoverBtn == params.row.id && (
              <Button
                style={{
                  position: "absolute",
                  color: "#ffffff",
                  backgroundColor: "#000000",
                  opacity: "0.8",
                }}
                title="update Image"
                onClick={() => {
                  setImageData(params.row);
                  setImageModal(!imageModal);
                }}
                color="inherit"
              >
                <EditIcon />
              </Button>
            )}
            {params.row.images.slice(0, 2).map((img: any, index: number) => (
              <img
                key={index}
                src={img.url}
                style={{ width: "30px", height: "30px", marginRight: "5px" }}
              />
            ))}{" "}
          </Box>
        ) : (
          <Button
            title="upload Image"
            onClick={() => {
              setImageData(params.row);
              setImageModal(!imageModal);
            }}
            color="inherit"
          >
            <UploadFileIcon />
          </Button>
        ),
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 60,
    },
    // {
    //   field: "ratings",
    //   headerName: "Ratings",
    //   width: 80,
    // },
    {
      field: "deleteButton",
      headerName: "Delete",
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            handleModal(params.id);
          }}
          color="inherit"
        >
          <DeleteIcon />
        </Button>
      ),
    },
    {
      field: "updateButton",
      headerName: "Update",
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            prePopulatedDataForModal.current = params.row;
            handleAddEntries();
            whichModal.current = false;
          }}
          color="inherit"
        >
          <EditIcon />
        </Button>
      ),
    },
  ];

  return (
    <>
      {allProductsState.length === 0 || userLoading ? (
        <Spinner />
      ) : !isAuthenticated && isAdmin ? (
        <Navigate to="/login" />
      ) : (
        <div style={{ marginTop: 80, padding: "0 40px 0 40px " }}>
          <Modal
            openModal={isModalOpen}
            handleAddEntries={handleAddEntries}
            whichModal={whichModal}
            prePopulatedDataForModal={prePopulatedDataForModal}
          />
          <DeleteModal
            showModal={showModal}
            closeModal={closeModal}
            handleClose={() => handleDeleteProduct(deleteId)}
          />
          {imageModal && (
            <ImageUpload
              imageData={imageData}
              setImageData={setImageData}
              modalImage={imageModal}
              closeImageModal={closeImageModal}
              setAllProductsState={setAllProductsState}
            />
          )}
          <div style={{ height: 650 }}>
            <Button
              variant="contained"
              component="label"
              style={{ float: "right", color: "#fff" }}
              onClick={() => {
                whichModal.current = true;
                handleAddEntries();
                prePopulatedDataForModal.current = {};
              }}
            >
              Add
              <AddIcon fontSize="small" />
            </Button>
            <h1>Products</h1>

            <DataGrid
              rows={allProductsState}
              getRowId={(row) => row.id}
              columns={columns}
              // checkboxSelection
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default ProductDashBoard;
