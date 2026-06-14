import { tavily } from "@tavily/core";

const tavilyClient = new tavily({
    apiKey: process.env.TAVILY_API_KEY,
});

export async function searchWeb(query) {
    const response = await tavilyClient.search(query, {
        maxResults: 5,
    });

    return response.results;
}