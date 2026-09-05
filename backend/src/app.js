const express = require("express");
const cors = require("cors");

const env = require("./config/env");
const routes = require("./routes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ success: true, message: "OK" }));

app.use("/api/v1", routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
