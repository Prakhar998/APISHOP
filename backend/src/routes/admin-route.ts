import express from "express";
import { AdminController } from "../controllers/adminController";
import { CategoryController } from "../controllers/CategoryController";
import { OrderController } from "../controllers/OrderController";
import { ProductController } from "../controllers/productController";
import { UserController } from "../controllers/UserController";
import { currentUser } from "../middleware/current-user";
import { catchErrors } from "../middleware/error-handler";
import { isAdmin } from "../middleware/is-admin";
import { requireAuth } from "../middleware/require-auth";
import { multerUpload } from "../middleware/upload";
const router = express.Router();
router.get("/user/all", currentUser, requireAuth, isAdmin, catchErrors(AdminController.getUsers));
router.get("/user/finduser", currentUser, requireAuth, isAdmin, catchErrors(AdminController.findUser));
router.delete("/user/delete/:id", currentUser, requireAuth, isAdmin, catchErrors(AdminController.deleteUser));
router.put("/user/block/:id", currentUser, requireAuth, isAdmin, catchErrors(AdminController.blockUser));
router.put("/user/unblock/:id", currentUser, requireAuth, isAdmin, catchErrors(AdminController.unblockUser));
router.post("/product/category/new", currentUser, requireAuth, isAdmin, catchErrors(CategoryController.createCategory));
router.get("/product/category/all", catchErrors(CategoryController.getAllCategories));
router.delete("/product/delete/:id", currentUser, requireAuth, isAdmin, catchErrors(AdminController.deleteProduct));
router.put("/user/set-admin/:id", currentUser, requireAuth, isAdmin, catchErrors(AdminController.setAdminUser));
router.put(
  "/order-status-update/:orderId",
  currentUser,
  requireAuth,
  isAdmin,
  catchErrors(OrderController.updateOrderStatus)
);

router.post(
  "/product/image-upload/:productId",
  currentUser,
  requireAuth,
  isAdmin,
  multerUpload.array("product-image"),
  catchErrors(ProductController.uploadProductImageByProductId)
);
router.delete(
  "/product/delete-image/:productId",
  currentUser,
  requireAuth,
  isAdmin,
  catchErrors(ProductController.deleteProductImageByPublicId)
);

export { router as adminRoute };
