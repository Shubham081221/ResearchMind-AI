import express from "express";
import { searchWeb } from "../services/tavily.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { query } = req.body;

        const results = await searchWeb(query);

        res.json({
            success: true,
            results,
        });
    } catch (error) {
        console.error("Error searching the web:", error);

        res.status(500).json({
            success: false,
            error: error.message || "An error occurred while searching the web.",
        });
    }
});

export default router;