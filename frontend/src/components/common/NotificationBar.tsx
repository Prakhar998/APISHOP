/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../redux/features/notification/notificationSlice";
import { type RootState } from "../../redux/store";

const NotificationBar = () => {
  const dispatch = useDispatch();
  const { notificationState, message, severity } = useSelector(
    (state: RootState) => state.notification
  );
  const handleClose = (reason?: any) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setNotification(false));
  };

  return (
    <>
      <Snackbar
        open={notificationState}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NotificationBar;
