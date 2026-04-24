import express from "express";
import { analyseTeam } from "../logic/analyseTeam.js";

const router = express.Router();

router.post("/analyze", (req, res) => {
  const { team } = req.body;

  if (!team || !Array.isArray(team)) {
    return res.status(400).json({ error: "Invalid team data" });
  }

  const analysis = analyseTeam(team);

  res.json({
    team,
    analysis
  });
});

export default router;