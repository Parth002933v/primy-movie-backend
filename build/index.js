"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const movie_route_1 = __importDefault(require("./routes/movie.route"));
const genere_route_1 = __importDefault(require("./routes/genere.route"));
const ageRating_route_1 = __importDefault(require("./routes/ageRating.route"));
const language_route_1 = __importDefault(require("./routes/language.route"));
const videoQualitys_route_1 = __importDefault(require("./routes/videoQualitys.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const movieProvider_router_1 = __importDefault(require("./routes/movieProvider.router"));
const ErrorObject_1 = __importDefault(require("./utils/ErrorObject"));
const errorHandler_middleware_1 = require("./middleware/errorHandler.middleware");
dotenv_1.default.config({ path: ".env" });
process.on("uncaughtException", (err) => {
    console.log(err.message);
    console.log("unhandled rejection is occured! shutting down...");
    server.close();
});
//connectDB
(0, db_1.default)();
// Create Express app
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const corsOptions = {
    origin: "http://localhost:5000", // Replace with your allowed origin(s)
    optionsSuccessStatus: 200, // Some legacy browsers (e.g., IE11) choke on 204
};
app.use((0, cors_1.default)(corsOptions));
// view engine
app.set("view engine", "ejs");
app.set("views", path_1.default.resolve("src/view"));
app.use(express_1.default.static("public"));
// Define a route handler for the root path
app.get("/", (req, res) => {
    res.end("server is running");
});
//api routes
app.use("/api/admin", admin_route_1.default);
app.use("/api/movies", movie_route_1.default);
app.use("/api/generes", genere_route_1.default);
app.use("/api/age-rating", ageRating_route_1.default);
app.use("/api/language", language_route_1.default);
app.use("/api/video-quality", videoQualitys_route_1.default);
app.use("/api/category", category_route_1.default);
app.use("/api/movie-provider", movieProvider_router_1.default);
// for incorrect route
app.use("*", (req, res, next) => {
    const error = new ErrorObject_1.default({
        message: `can't find ${req.originalUrl} on the server`,
        statusCode: 404,
    });
    next(error);
});
// global error handler
app.use(errorHandler_middleware_1.globalErrorHandler);
// Start the server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
});
// if unhandled exception in occcure the app will shutdown
process.on("unhandledRejection", (err) => {
    console.log(err.message);
    console.log("unhandled rejection is occured! shutting down...");
    server.close(() => {
        process.exit(1);
    });
});
