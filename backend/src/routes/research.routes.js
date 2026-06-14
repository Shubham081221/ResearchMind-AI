import express from 'express';
import { generateContent } from '../services/gemini.js';
import { runResearchAgent } from "../agents/researchAgent.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { query } = req.body;

        const response = await runResearchAgent(query);

        res.json({
            success: true,
            ...response,
        });
    } catch (error) {
        console.error("Error generating content:", error);

        res.status(500).json({
            success: false,
            error: error.message || "An error occurred while generating content.",
        });
    }
});

export default router;