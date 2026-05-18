import express from "express";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
import cors from "cors";
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

app.use(errorMiddleware);

export default app;