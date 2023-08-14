import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateProfileImage } from "../../redux/features/userProflie/userProfileApis";
import { AppDispatch } from "../../redux/store";
import { addImage } from "../../redux/features/userProflie/userProfileSlice";
import { authUser } from "../../redux/features/auth/authSlice";

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

const UserProfileModal = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { showImageModal, closeModal } = props;
  const [img, setImage] = useState("");
  const [refreshState, setRefreshState] = useState(false);

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilepic", img);
    const data = {
      values: formData,
    };
    dispatch(updateProfileImage(data))
      .then(() => {
        dispatch(addImage(data));
        setRefreshState((prev) => !prev);
        console.log(refreshState);
        dispatch(authUser());
      })
      .then(() => {
        toast.success(
          <>
            Image Uploaded Succesfully{" "}
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
  };
  return (
    <div>
      {showImageModal && (
        <Dialog
          open={showImageModal}
          PaperProps={{
            style: {
              margin: "10px",
              width: "25%",
            },
          }}
          onClose={closeModal}
        >
          <BootstrapDialogTitle
            className="image-modal-heading"
            id="customized-dialog-title"
            onClose={closeModal}
          >
            User Profile Image
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
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserProfileModal;
