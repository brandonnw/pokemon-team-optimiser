import express from "express";
import cors from "cors";
import teamRoutes from "./routes/teamRoutes.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api/team", teamRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});