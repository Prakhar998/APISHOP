import express from "express";
import { AddressController } from "../controllers/addressController";
import { AdminController } from "../controllers/adminController";
import { UserController } from "../controllers/UserController";
import { currentUser } from "../middleware/current-user";
import { catchErrors } from "../middleware/error-handler";
import { isAdmin } from "../middleware/is-admin";
import { requireAuth } from "../middleware/require-auth";
import { multerUpload } from "../middleware/upload";
const router = express.Router();
router.post("/signup", catchErrors(UserController.signUp));
router.post("/signin", catchErrors(UserController.signIn));
router.get("/currentuser", currentUser, requireAuth, catchErrors(UserController.currentUser));
router.get("/profile", currentUser, requireAuth, catchErrors(UserController.getProfile));
router.post("/signout", currentUser, requireAuth, catchErrors(UserController.signout));
router.put("/update", currentUser, requireAuth, catchErrors(UserController.updateProfile));
router.post(
  "/upload-user-image",
  currentUser,
  requireAuth,
  multerUpload.single("profilepic"),
  catchErrors(UserController.uploadUserImage)
);
router.post("/cart/localToCart", currentUser, requireAuth, catchErrors(UserController.localToCartUp));
router.post("/cart/add", currentUser, requireAuth, catchErrors(UserController.addToCart));
router.put("/cart/decrease-quantity", currentUser, requireAuth, catchErrors(UserController.decreaseQuantityOfCart));
router.put("/cart/increase-quantity", currentUser, requireAuth, catchErrors(UserController.increaseQuantityOfCart));
router.delete("/cart/remove", currentUser, requireAuth, catchErrors(UserController.deleteItemFromCartofCurrentUser));
router.get("/cart/all", currentUser, requireAuth, catchErrors(UserController.getCartOfCurrentUser));
router.post("/address/add", currentUser, requireAuth, catchErrors(AddressController.AddAddressForUser));
router.get("/address/get", currentUser, requireAuth, catchErrors(AddressController.getAddressOfCurrentUser));
router.put(
  "/address/update/:addressId",
  currentUser,
  requireAuth,
  catchErrors(AddressController.updateAddressOfCurrentUser)
);
router.put(
  "/address/set-default/:addressId",
  currentUser,
  requireAuth,
  catchErrors(AddressController.setDefaultAddressbyId)
);
router.delete("/address/delete/:addressId", currentUser, requireAuth, catchErrors(AddressController.removeAddressById));
router.post("/verifyEmail", catchErrors(UserController.verifyEmail));
router.post("/changeEmail", currentUser, requireAuth, catchErrors(UserController.changeEmailOfUser));
router.post("/resendEmailVerificationLink", catchErrors(UserController.reSendEmailVerify));
if (process.env.NODE_ENV === "development") {
  router.get("/getOtpByEmailForDevelopment", catchErrors(UserController.getOtpByEmailOnlyForDevelopment));
}
router.post("/forgotPassword", catchErrors(UserController.forgotPassword));
router.post("/verifyForgotPassword", catchErrors(UserController.verifyForgetPassword));
router.post("/resetPassword", catchErrors(UserController.resetPassword));
router.delete("/clearCart", currentUser, requireAuth, catchErrors(UserController.clearCart));
export { router as userRoute };
