import multer from "multer";
import path from "path";
const multerStorage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"));
      return;
    }
    cb(null, true);
  },
  limits: {
    fileSize: 200000,
  },
});

export const multerUpload = multerStorage;
