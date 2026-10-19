const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/applications", applicationRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("BrandOrbit API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});