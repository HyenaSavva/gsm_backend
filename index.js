const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./src/routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(fileUpload()); // { useTempFiles: true, tempFileDir: "./tmp" }

app.use("/api", router);
// app.use(errorHandler);

(async () => {
  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
  });
})();
