import express from "express";

const router = express.Router();

router.post("/analyze", (req, res) => {
  const { team } = req.body;

  // basic validation
  if (!team || !Array.isArray(team)) {
    return res.status(400).json({ error: "Invalid team data" });
  }

  res.json({
    message: "Team received successfully",
    team
  });
});

export default router;