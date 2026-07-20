import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.log("API_KEY not in .env");
  throw new Error("API_KEY not in .env");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends a raw internship log to the Gemini API and returns a professionally rewritten version.
 *
 * @param rawContent - The original text inputted by the user.
 * @returns The improved log text.
 */
export async function improveLogContent(rawContent: string): Promise<string> {
  if (!rawContent || rawContent.trim() === "") {
    throw new Error("Log content cannot be empty.");
  }

  const systemInstruction = `You are an expert technical editor helping a university student polish their daily internship log.
Your goal is to rewrite the provided entry to be professional, grammatically correct, and suitable for an official university internship report.

Strict Rules:
1. Fix all grammar, syntax, and spelling errors.
2. Elevate the vocabulary to a professional engineering standard.
3. DO NOT invent, assume, or add any new tasks, technologies, or events that are not explicitly present in the original text.
4. Format the output cleanly (use bullet points if the student describes multiple distinct tasks).
5. Output ONLY the improved text. Do not include any conversational filler, greetings, or explanations.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: rawContent,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2,
      },
    });

    if (!response.text) {
      throw new Error("The AI model returned an empty response.");
    }

    return response.text.trim();
  } catch (error) {
    console.error("Error improving log content via Gemini:", error);
    // Throw a sanitized error for the controller to catch and send to the client
    throw new Error("Failed to generate an improved log. Please try again.");
  }
}
