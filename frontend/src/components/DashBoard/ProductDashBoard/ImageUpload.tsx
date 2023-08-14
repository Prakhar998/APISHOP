import { useState} from "react";
import Button from "@mui/material/Button";
import "./imagestyle.css";
import axios, { AxiosRequestConfig } from "axios";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    width: "500px",
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props: any) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const ImageUpload = (props: any) => {

  const {
    modalImage,
    closeImageModal,
    imageData,
    setImageData,
    setAllProductsState,
  } = props;
  const [img, setImage] = useState("");
  const [imageProgress, setImageProgress] = useState<string>("stop");

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const deleteImageHandler = async (productId: string, imageId: string) => {
    const confirm = window.confirm("Are you sure to delete this Image?");

    if (confirm) {
      const requestConfig: AxiosRequestConfig = {};
      requestConfig.data = { public_id: imageId };

      try {
        await axios.delete(
          `/api/admin/product/delete-image/${productId}`,
          requestConfig
        );
        const deleteImg = imageData.images.filter(
          (img: any) => img.public_id != imageId
        );

        setImageData((prev: any) => ({ ...prev, images: deleteImg }));
        setAllProductsState((prev: any) => {
          const filterData = prev.map((product: any) => {
            if (product.id == productId) {
              const updateProduct = { ...product };
              updateProduct.images = deleteImg;
              return updateProduct;
            }
            return product;
          });
          return filterData;
        });
        await toast.success("Image Delete Successfully!");
      } catch (error) {
        await toast.error("Failed, Something went wrong!");
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (imageData.images.length === 4) {
      return toast.error("Cannot add more then 4 images!");
    }
    setImageProgress("progress");
    const formData = new FormData();
    formData.append("product-image", img);
    const data = {
      id: imageData.id,
      values: formData,
    };
    try {
      const res = await axios.post(
        `/api/admin/product/image-upload/${data.id}`,
        data.values,
        {
          onUploadProgress: (progress: any) => {
            if (progress?.loaded / progress?.total === 1) {
              setImage("");
              setImageProgress("done");
            }
          },
        }
      );
      setImageData((prev: any) => ({ ...prev, images: res.data.data }));
      setAllProductsState((prev: any) => {
        const filterData = prev.map((product: any) => {
          if (product.id == imageData.id) {
            const updateProduct = { ...product };
            updateProduct.images = res.data.data;
            return updateProduct;
          }
          return product;
        });
        return filterData;
      });
    } catch (error) {
      await toast.error("Failed, Something went wrong!");
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={closeImageModal}
        aria-labelledby="customized-dialog-title"
        open={modalImage}
      >
        <BootstrapDialogTitle
          className="image-modal-heading"
          id="customized-dialog-title"
          onClose={closeImageModal}
        >
          Product Images
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box className="image-upload-box">
            <input type="file" id="fileUpload" onChange={handleFileChange} />
            <label htmlFor="fileUpload" className="file-btn">
              <AddPhotoAlternateIcon />
            </label>
            <Button
              sx={{
                backgroundColor: "#00bcd4",
                width: "120px",
                margin: "15px 0 10px",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#00bcd4" },
              }}
              onClick={handleSubmit}
              disabled={img == ""}
            >
              {img == "" ? "Select File" : "Upload"}{" "}
            </Button>
            {imageProgress !== "stop" &&
              (imageProgress == "done" ? (
                <Alert style={{ flex: "1" }} severity="success">
                  Image upload Successfully!
                </Alert>
              ) : (
                `Uploading...`
              ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "25px",
              borderTop: "1px solid #ccc",
              paddingTop: "20px",
            }}
          >
            {imageData.images.length > 0 ? (
              imageData.images.slice(0, 4).map((img: any) => (
                <Box key={img.url} sx={{ position: "relative" }}>
                  <img
                    src={img.url}
                    style={{ width: "60px", height: "60px" }}
                    alt="loading.."
                  />
                  <CancelIcon
                    onClick={() =>
                      deleteImageHandler(imageData.id, img.public_id)
                    }
                    titleAccess="Delete Product"
                    sx={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              ))
            ) : (
              <Alert style={{ flex: "1" }} severity="info">
                No Images Add for this Product!
              </Alert>
            )}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default ImageUpload;
