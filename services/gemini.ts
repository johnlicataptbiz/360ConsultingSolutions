
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

export const getBusinessAnalysis = async (challenge: string) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: `Analyze this business challenge and provide a '360-degree perspective' covering Strategy, Operations, and Growth: "${challenge}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    strategy: {
                        type: Type.STRING,
                        description: 'Strategic recommendations to address the challenge.',
                    },
                    operations: {
                        type: Type.STRING,
                        description: 'Operational efficiency improvements needed.',
                    },
                    growth: {
                        type: Type.STRING,
                        description: 'Potential for scaling or market growth.',
                    },
                    summary: {
                        type: Type.STRING,
                        description: 'A brief executive summary of the 360-degree approach.',
                    },
                },
                required: ["strategy", "operations", "growth", "summary"],
            },
            systemInstruction: "You are a senior partner at 360 Consulting Solutions. Your tone is professional, direct, and insightful. You provide high-level strategic advice focused on holistic business health."
        },
    });

    try {
        return JSON.parse(response.text.trim());
    } catch (error) {
        console.error("Failed to parse Gemini response", error);
        throw new Error("Could not generate analysis. Please try again.");
    }
};
