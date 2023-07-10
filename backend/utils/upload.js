const path = require("path");
const multer = require("multer");

// Disk storage
const storage = multer.diskStorage({
  destination: "./upload/files/",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "application/vnd.ms-excel" || // Excel file (.xlsx)
    file.mimetype === "application/pdf" // PDF file (.pdf)
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filefilter,
});

module.exports = upload;
