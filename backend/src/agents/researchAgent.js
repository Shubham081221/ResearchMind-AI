import { searchWeb } from "../services/tavily.js";
import { generateContent } from "../services/gemini.js";
import { supabase } from "../db/supabase.js";

export async function runResearchAgent(query) {

    const sources = await searchWeb(query)

    const content = await sources.map(
            (source, index) =>
            `Source${index + 1}: ${source.title}
            URL: ${source.url} 
            content: ${source.content}`
        ).join("\n\n");

    // const prompt = `You are an expert research analyst.
    //                 Research Topic: ${query}
                    
    //                 Sources:${content}
                    
    //                 Generate a detailed report with:

    //                 1. Executive Summary
    //                 2. Key Findings
    //                 3. Important Trends
    //                 4. Challenges
    //                 5. Future Outlook
    //                 6. References`    ;

    const prompt = `
                    You are a senior research analyst.

                    Research Topic:
                    ${query}

                    Sources:
                    ${content}

                    Create a professional research report.

                    Format:

                    # Executive Summary

                    # Key Findings

                    # Trends and Insights

                    # Challenges and Risks

                    # Future Outlook

                    # Conclusion

                    # References

                    Use information only from the provided sources.
               `;

    const report = await generateContent(prompt);

try {
    await supabase
        .from("research_sessions")
        .insert({
            query,
            report,
        });
} catch (error) {
    console.error("Supabase Save Error:", error);
}

return {
    report,
    sources,
};
    
       
}