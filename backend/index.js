import express from "express";
import createError from "http-errors";
import morgen from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import cors from "cors";
import projectRoute from "./routes/project.js";
import bodyParser from "body-parser";
import schedule from "node-schedule";
import taskDeadline from "./utils/dealine.js";
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

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/files", express.static("uploads"));

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
// scheduling at 1:10 pm
schedule.scheduleJob("12 13 * * *", function () {
  console.log("The answer to life, the universe, and everything!");
});

// scheduling at each mid night 12:00 am check for task all deadline then mail
schedule.scheduleJob("25 13 * * *", function () {
  //cheking task deadline and send mail
  taskDeadline();
});

//adding 404 error handler
app.use((req, res, next) => {
  res.status(404).send("404 error");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Runing on Port ${PORT}`);
});
