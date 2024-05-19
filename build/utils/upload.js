"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function sanitizeFileName(fileName) {
    // Replace spaces with underscores
    let sanitizedFileName = fileName.replace(/\s+/g, "_");
    // Replace special characters with underscores
    sanitizedFileName = sanitizedFileName.replace(/[^\w.-]/g, "_");
    return sanitizedFileName;
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.baseUrl == "/api/movie-provider") {
                const dir = "./public/images/icons/";
                yield fs_extra_1.default.ensureDir(dir);
                return cb(null, dir);
            }
            const dir = "./public/images/";
            yield fs_extra_1.default.ensureDir(dir);
            return cb(null, dir);
        });
    },
    filename: function (req, file, cb) {
        const sanitizedFileName = sanitizeFileName(file.originalname);
        cb(null, Date.now() + "-" + sanitizedFileName);
    },
});
const fileFilter = function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error("Only images are allowed"));
};
// Create Multer instance
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
});
