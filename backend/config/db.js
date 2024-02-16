import mongoose from "mongoose";
mongoose.set("strictQuery", true);
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    .then(() => {
      console.log("mongodb connected");
    })
    .catch((err) => console.log(err.message));

  mongoose.connection.on("connected", () => {
    console.log("Mongoose Connected to db");
  });
};
export default connectDB;
