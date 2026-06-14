import { searchWeb } from "../services/tavily.js";
import { generateContent } from "../services/gemini.js";

export async function runResearchAgent(query) {

    const sources = await searchWeb(query)

    const content = await sources.map(
            (source, index) =>
            `Source${index + 1}: ${source.title}
            URL: ${source.url} 
            content: ${source.content}`
        ).join("\n\n");

    const prompt = `You are an expert research analyst.
                    Research Topic: ${query}
                    
                    Sources:${content}
                    
                    Generate a detailed report with:

                    1. Executive Summary
                    2. Key Findings
                    3. Important Trends
                    4. Challenges
                    5. Future Outlook
                    6. References`    ;

    const report = await generateContent(prompt);
    
    return {
        report,
        sources,
    };
    
}