
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const enrollmentRouter = require("./routes/enrollmentRoute");
const certificateRouter = require("./routes/certificateRoutes");
const courseRouter = require("./routes/coursesRoutes");
const quizRouter = require("./routes/quizRoutes");
const assignmentRouter = require("./routes/assignmentRoutes");   
const authRouter = require("./routes/authRoutes");
const receiveRouter = require('./routes/recieveRoutes');




dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use("/api/enrollment", enrollmentRouter);
app.use("/api/certificate", certificateRouter);
app.use("/api/courses", courseRouter);  
app.use("/api/quiz", quizRouter);
app.use("/api/assignments", assignmentRouter);
app.use('/api/receive',receiveRouter);


module.exports = app;


