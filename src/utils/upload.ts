import multer from "multer";
import path from "path";

// Define a function to sanitize filenames
function sanitizeFileName(fileName: string): string {
  // Replace spaces with underscores
  let sanitizedFileName = fileName.replace(/\s+/g, "_");

  // Replace special characters with underscores
  sanitizedFileName = sanitizedFileName.replace(/[^\w.-]/g, "_");

  return sanitizedFileName;
}

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/movie-provider"); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    // Sanitize the original filename
    const sanitizedFileName = sanitizeFileName(file.originalname);
    cb(null, Date.now() + "-" + sanitizedFileName); // Specify the sanitized filename
  },
});

const fileFilter = function (req: any, file: any, cb: any) {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("Only images are allowed"));
};

// Create Multer instance
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
