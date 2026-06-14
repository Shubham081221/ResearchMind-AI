import dotenv from "dotenv";
import {GoogleGenAI} from "@google/genai";

dotenv.config();

const genai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateContent(prompt){
    const response = await genai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [prompt],
    });

    return response.text;
}