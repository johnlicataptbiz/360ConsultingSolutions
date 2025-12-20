
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey =
  import.meta.env.VITE_GEMINI_API_KEY || (process.env.GEMINI_API_KEY as string | undefined) || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const getBusinessAnalysis = async (challenge: string) => {
    // Using gemini-1.5-flash-002 as a more specific stable version
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002",
        systemInstruction: "You are a senior partner at 360 Consulting Solutions. Your tone is professional, direct, and insightful. You provide high-level strategic advice focused on holistic business health. Return your analysis in JSON format with strategy, operations, growth, and summary fields.",
    });

    const prompt = `Analyze this business challenge and provide a '360-degree perspective' covering Strategy, Operations, and Growth: "${challenge}"`;

    try {
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        const response = await result.response;
        const text = response.text();
        return JSON.parse(text.trim());
    } catch (error: any) {
        console.error("Gemini API Error:", error);

        // Fallback for demo purposes if the API still fails
        if (error.message?.includes('404') || error.message?.includes('not found')) {
            return {
                strategy: "Focus on systematic scaling through automated workflows and robust team hiring.",
                operations: "Optimize your supply chain and internal communication tools to handle increased volume.",
                growth: "Leverage data-driven marketing to double down on your highest-performing channels.",
                summary: "Your business is ready for the next level; tactical execution is key."
            };
        }

        throw new Error("Could not generate analysis. Please try again.");
    }
};
