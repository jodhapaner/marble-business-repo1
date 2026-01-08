
import { GoogleGenAI, Type } from "@google/genai";
import { MARBLE_INVENTORY, SERVICES, VENDORS } from "../data/inventory";

// Initialize Gemini API with key from environment variable - strictly use process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "Expert Consultant" for Royal Rajasthan Premium Marble and Stones. 

PRIORITY DESIGNS (ROYAL RAJASTHAN CATALOG):
1. PAGE 23 Selection: C122 (Abstract Wave) and C123 (Lotus Relief). These are the flagship contemporary designs.
2. PAGE 25 Selection: C124 (Diamond Lattice) and C125 (Heritage Jali). These are the flagship traditional designs.

Your role:
- When asked for "the best designs" or "catalog highlights", specifically point the user to Page 23 and Page 25.
- Explain the technical precision of the Royal Rajasthan CNC process for these specific patterns.
- PITCH SERVICES: Strongly suggest the "Expert Ground Consultant" (₹4,999/day) if they want to visit the Kishangarh/Makrana markets to select the base marble for these designs.
- Use Royal Rajasthan catalog codes (C101-C128) in your recommendations.

Be authoritative, luxury-oriented, and helpful.
`;

export const getMarbleConsultation = async (userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I am here to guide your selection from the Royal Rajasthan catalog. How can I assist with your design choice today?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our concierge is temporarily unavailable. Please browse the Page 23 and 25 selections in our Stone Art gallery.";
  }
};
