const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination folder where the files will be stored
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for each uploaded file
    //console.log(file);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// const filefilter = (req, file, cb) => {
//   if (
//     file.mimetype === "application/vnd.ms-excel" || // Excel file (.xlsx)
//     file.mimetype === "application/pdf" // PDF file (.pdf)
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({
  storage: storage,
  //fileFilter: filefilter,
});

module.exports = upload;
