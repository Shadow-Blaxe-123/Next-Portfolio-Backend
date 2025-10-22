import express, { Application } from "express";
import router from "./routes";
import cookieParser from "cookie-parser";
import notFound from "./middleware/404";

const app: Application = express();

// 3rd party middleware
app.use(express.json());
app.set("trust proxy", 1);
// app.use(
//   cors({
//     origin: env.FRONTEND_URL,
//     credentials: true,
//   })
// );

app.use(cookieParser());

// Routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Error handlers
// app.use(globalErrorHandler);
app.use(notFound);

export default app;
