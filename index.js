require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8888;
const logger = require("./Middlewares/logger.middlewares.js");
const {errorHandler , notFound} = require("./Middlewares/error.middlewares.js");
const ConnectToDB = require("./Config/connectDB.js");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
// Connect To Database
ConnectToDB();
// Static Folder
app.use(express.static(path.join(__dirname, "Images")))
// Apply Middlewares
app.use(express.json());
app.use(logger);
app.use(express.urlencoded({extended: false}));

// Helmet
app.use(helmet());

// Cors Policy
app.use(cors());

// Set View Engine
app.set('view engine', 'ejs');

// Routes
app.use("/api/books", require("./Routes/books.route.js"));
app.use("/api/authors" , require("./Routes/authors.route.js"));
app.use("/api/auth", require("./Routes/auth.route.js"));
app.use("/api/user", require("./Routes/users.route.js"));
app.use("/password", require("./Routes/password.route.js"));
app.use("/api/upload", require("./Routes/upload.route"));
// Error Handler
app.use(notFound);
app.use(errorHandler);

// Running The Server
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});
