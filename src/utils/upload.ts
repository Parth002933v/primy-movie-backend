import multer from "multer";
import path from "path";
import fs from "fs-extra";

function sanitizeFileName(fileName: string): string {
  // Replace spaces with underscores
  let sanitizedFileName = fileName.replace(/\s+/g, "_");

  // Replace special characters with underscores
  sanitizedFileName = sanitizedFileName.replace(/[^\w.-]/g, "_");

  return sanitizedFileName;
}

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    if (req.baseUrl == "/api/movie-provider") {

      const dir = "./public/images/icons/";
      await fs.ensureDir(dir);
      return cb(null, dir);
    }

    const dir = "./public/images/";
    await fs.ensureDir(dir);
    return cb(null, dir);
  },

  filename: function (req, file, cb) {
    const sanitizedFileName = sanitizeFileName(file.originalname);
    cb(null, Date.now() + "-" + sanitizedFileName);
  },
});

const fileFilter = function (req: any, file: any, cb: any) {
  const filetypes = /jpeg|jpg|png|webp/;
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
