const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");

const driveRoutes = require("./routes/drive.route");

const app = express();

// Allow Cross-Origin requests
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/drive", driveRoutes);

// handle undefined Routes
// app.use("*", (req, res, next) => {
//   const err = new AppError(404, "fail", "undefined route");
//   next(err, req, res, next);
// });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
