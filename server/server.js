const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/admin-Routes");
const courseRoutes = require("./routes/Course-Routes");
const contactRoutes = require("./routes/Contact-Routes");
const app = express();
const _PORT = process.env.PORT;
// Middleware
app.use(cors());
app.use(express.json());
// Connect to MongoDB
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DB;
connectDB(username, password, database);
// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/contact", contactRoutes);
// Start server
app.listen(_PORT, () => {
    console.log(`Server running on port ${_PORT}`);
  });