import express from "express";
import SavedTeam from "../models/savedTeam.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { teamName, pokemon, analysis } = req.body;

    if (!teamName || !pokemon || !Array.isArray(pokemon) || pokemon.length === 0) {
      return res.status(400).json({ error: "Team name and Pokémon are required" });
    }

    const savedTeam = await SavedTeam.create({
      user: req.userId,
      teamName,
      pokemon,
      analysis: analysis || null
    });

    res.status(201).json(savedTeam);
  } catch (error) {
    console.error("Save team error:", error.message);
    res.status(500).json({ error: "Failed to save team" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const teams = await SavedTeam.find({ user: req.userId }).sort({
      createdAt: -1
    });

    res.json(teams);
  } catch (error) {
    console.error("Get teams error:", error.message);
    res.status(500).json({ error: "Failed to fetch saved teams" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const team = await SavedTeam.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!team) {
      return res.status(404).json({ error: "Saved team not found" });
    }

    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Delete team error:", error.message);
    res.status(500).json({ error: "Failed to delete team" });
  }
});

export default router;