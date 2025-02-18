const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connection established to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose;
