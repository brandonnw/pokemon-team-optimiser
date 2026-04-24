import express from "express";
import { analyseTeam } from "../logic/analyseTeam.js";
import { generateTeamSummary } from "../logic/aiSummary.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  const { team, includeAiSummary = false } = req.body;

  if (!team || !Array.isArray(team)) {
    return res.status(400).json({ error: "Invalid team data" });
  }

  const analysis = analyseTeam(team);

  let aiSummary = null;

  if (includeAiSummary) {
    try {
      aiSummary = await generateTeamSummary(team, analysis);
    } catch (error) {
      console.error("AI summary failed:", error.message);
      aiSummary = "AI summary is temporarily unavailable, but your team analysis still completed successfully.";
    }
  }

  res.json({
    team,
    analysis,
    aiSummary
  });
});

export default router;