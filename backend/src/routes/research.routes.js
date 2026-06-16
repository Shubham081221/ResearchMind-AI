import express from 'express';
import { generateContent } from '../services/gemini.js';
import { runResearchAgent } from "../agents/researchAgent.js";
import { supabase } from '../db/supabase.js';

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

router.get("/history", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("research_sessions")
            .select("*")
            .order("created_at", { ascending: false });

            if (error) {
                throw error;
            }

            res.json({
                success: true,
                history: data,
            });
    } catch (error) {
        res.json({
            success: false,
            error: error.message || "An error occurred while fetching history.",
        });
    }
});

export default router;