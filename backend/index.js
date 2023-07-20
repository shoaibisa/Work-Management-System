import express from "express";
import createError from "http-errors";
import morgen from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import cors from "cors";
import projectRoute from "./routes/project.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", async (req, resq, next) => {
  resq.send("Hello From Express default route");
});

// routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/project", projectRoute);

// app.use(async (req, resq, next) => {
//   next(createError.NotFound());
// });

// app.use((err, req, resq, next) => {
//   resq.status(err.status || 500);
//   resq.send({
//     error: {
//       status: err.status || 500,
//       message: err.message,
//     },
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Runing on Port ${PORT}`);
});
