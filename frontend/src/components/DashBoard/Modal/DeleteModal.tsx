import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const DeleteModal = (props: any) => {
  const { showModal, handleClose, closeModal, userFlag, name } =
    props;
  const handleCloseModal = () => {
    closeModal(!showModal);
  };
  const handleSubmit = () => {
    handleClose();
  };

  return (
    <div>
      {showModal && (
        <Dialog
          open={showModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {userFlag &&
                name === undefined &&
                "Do you want to delete this user"}
              {!userFlag &&
                name === undefined &&
                "Do you want to delete this product"}
              {!userFlag && name !== undefined && name}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleSubmit} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
export default DeleteModal;
