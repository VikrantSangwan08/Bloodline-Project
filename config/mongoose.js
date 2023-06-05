const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongoose.set("strictQuery", false);
    // mongoose.set("strictPopulate", false);
    await mongoose.connect(
      "mongodb+srv://vikrant:vikrant123@bloodline.afkfsqe.mongodb.net/",
      {
        useNewUrlParser: true,
      }
    );

    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
