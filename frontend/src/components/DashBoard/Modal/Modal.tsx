import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  addProduct,
  getAllCategories,
  updateProduct,
} from "../../../api/dashboardApis";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import "./style.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface propsFromProductDashboard {
  openModal: boolean;
  handleAddEntries: (args: boolean) => void;
  whichModal: { current: boolean };
  prePopulatedDataForModal: {
    current: {
      name?: string;
      description?: string;
      price?: number;
      ratings?: number;
      stock?: number;
      id?: string;
      category?: {
        createdAt?: string;
        id?: string;
        title?: string;
        updatedAt?: string;
        __v?: number;
      };
    };
  };
}
interface CategoryType {
  title: string;
  __v?: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

const Modal = (props: propsFromProductDashboard) => {
  const dispatch = useDispatch<AppDispatch>();
  const [saveLoadingButton, setSaveLoadingButton] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>();
  const { openModal, handleAddEntries, whichModal, prePopulatedDataForModal } =
    props;
  useEffect(() => {
    dispatch(getAllCategories()).then((res:any) => {
      setCategories(res?.payload?.data?.data);
    });
  }, [dispatch]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: whichModal.current
      ? {
          name: "",
          description: "",
          price: "",
          ratings: "",
          stock: "",
          category: "",
          submit: null,
        }
      : {
          name: prePopulatedDataForModal.current.name,
          description: prePopulatedDataForModal.current.description,
          price: prePopulatedDataForModal.current.price,
          ratings: prePopulatedDataForModal.current.ratings,
          stock: prePopulatedDataForModal.current.stock,
          category:
            categories !== undefined &&
            categories.length > 0 &&
            prePopulatedDataForModal.current.category?.title
              ? prePopulatedDataForModal.current.category.title
              : "some",

          submit: null,
        },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      description: Yup.string().max(999999).required("Description is required"),
      price: Yup.number().max(9999999).required("Price is required"),
      ratings: Yup.number().max(5).required("Rating is required"),
      stock: Yup.number().max(1000).required("Stock is required"),
      category: Yup.string().max(255).required("Category is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const result = categories?.find((obj) => obj.title === values.category);
      setSaveLoadingButton(true);
      whichModal.current
        ? dispatch(addProduct(values)).then(() => {
            handleAddEntries(false);
            setSaveLoadingButton(false);
            resetForm({});
            toast.success(
              <>
                Product Added Succesfully
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
          })
        : dispatch(
            updateProduct({
              id: prePopulatedDataForModal.current.id,
              values: values,
              category: result !== undefined && result.id,
            })
          ).then((res:any) => {
            if (res?.payload?.data?.success === true) {
              setSaveLoadingButton(false);
              handleAddEntries(false);
              resetForm({});
              toast.success(
                <>
                  Product Updated Succesfully
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
            }
          }); //dispatch api

      formik.setTouched({}, false);
    },

    //flag for refresh
  });
  const handleClose = () => {
    formik.setTouched({}, false);
    handleAddEntries(false);
    formik.resetForm();
  };
  return (
    <div>
      {openModal && (
        <Dialog
          open={openModal}
          PaperProps={{
            style: {
              margin: "10px",
              width: "25%",
            },
          }}
          onClose={handleClose}
        >
          <DialogTitle>Add Products</DialogTitle>
          <Box
            sx={{
              flex: "1 1 auto",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              borderRadius: "0.2em",
              boxShadow: "0 10px 20px rgba(black, 0.2)",
              backgroundColor: "#F8F8F8	",
            }}
          >
            <Box
              sx={{
                maxWidth: 550,
                px: 3,
                py: "25px",
                width: "100%",
              }}
            >
              <div>
                <form noValidate onSubmit={formik.handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      error={!!(formik.touched.name && formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      label="Name"
                      name="name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    <TextField
                      error={
                        !!(
                          formik.touched.description &&
                          formik.errors.description
                        )
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                      label="Descritpion"
                      name="description"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="description"
                      value={formik.values.description}
                    />
                    <TextField
                      error={!!(formik.touched.price && formik.errors.price)}
                      helperText={formik.touched.price && formik.errors.price}
                      label="Price"
                      name="price"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="number"
                      value={formik.values.price}
                    />
                    <TextField
                      error={
                        !!(formik.touched.ratings && formik.errors.ratings)
                      }
                      helperText={
                        formik.touched.ratings && formik.errors.ratings
                      }
                      label="Ratings"
                      name="ratings"
                      disabled={!whichModal.current ? true : false}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="number"
                      value={formik.values.ratings}
                    />
                    <TextField
                      error={!!(formik.touched.stock && formik.errors.stock)}
                      helperText={formik.touched.stock && formik.errors.stock}
                      label="Stock"
                      name="stock"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="number"
                      value={formik.values.stock}
                    />

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Category
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formik.values.category}
                        label="category"
                        name="category"
                        onChange={formik.handleChange}
                      >
                        {categories !== undefined &&
                          categories.map((items: CategoryType) => {
                            return (
                              <MenuItem value={items.title} key={items.title}>
                                {items.title}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Stack>
                  {formik.errors.submit ? (
                    <Typography color="error" sx={{ mt: 3 }} variant="body2">
                      {formik.errors.submit}
                    </Typography>
                  ) : (
                    ""
                  )}
                  <DialogActions
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      size="large"
                      sx={{ mt: 3, color: "#fff", backgroundColor: "#87CEFA" }}
                      type="reset"
                      variant="contained"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Cancel
                    </Button>

                    {whichModal.current && saveLoadingButton && (
                      <LoadingButton
                        loading
                        size="large"
                        sx={{ mt: 3 }}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                      >
                        Saving
                      </LoadingButton>
                    )}
                    {whichModal.current && !saveLoadingButton && (
                      <Button
                        size="large"
                        sx={{
                          mt: 3,
                          color: "#fff",
                          backgroundColor: "#87CEFA",
                        }}
                        type="submit"
                        variant="contained"
                      >
                        Submit
                      </Button>
                    )}
                    {!whichModal.current && !saveLoadingButton && (
                      <Button
                        size="large"
                        sx={{
                          mt: 3,
                          color: "#fff",
                          backgroundColor: "#87CEFA",
                        }}
                        type="submit"
                        variant="contained"
                      >
                        Update
                      </Button>
                    )}
                    {!whichModal.current && saveLoadingButton && (
                      <LoadingButton
                        loading
                        size="large"
                        sx={{ mt: 3 }}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                      >
                        Updating
                      </LoadingButton>
                    )}
                  </DialogActions>
                </form>
              </div>
            </Box>
          </Box>
        </Dialog>
      )}
    </div>
  );
};

export default Modal;
