require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const sanitize = require("./middleware/sanitize");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
app.use(sanitize);

app.get("/api/health", (req, res) =>
  res.json({ status: "ok", uptime: process.uptime(), time: new Date().toISOString() })
);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/locations", require("./routes/locationRoutes"));
app.use("/api/weather", require("./routes/weatherRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() =>
  app.listen(PORT, () => console.log(`AI WeatherWise running on port ${PORT}`))
);
