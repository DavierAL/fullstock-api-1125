import express from "express";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error.middleware.ts";
import { sessionMiddleware } from "./middlewares/session.middleware.ts";
import router from "./routes.ts";

const app = express();
app.use(express.json());
app.use(sessionMiddleware);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", router);

// Aqui se ponen los middlewares de error
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
