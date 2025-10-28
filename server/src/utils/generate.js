import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const API_KEY = process.env.API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

/**
 * Sends a user's raw log content to the Gemini API for enhancement.
 * @param {string} rawContent The raw log text from the user.
 * @returns {Promise<string>} A promise that resolves with the enhanced AI-generated text.
 */
export const generate = async (rawContent) => {
  const systemInstruction = `
You are an AI assistant that helps interns write professional and well-structured daily logs. 
You will transform an informal log entry into a concise, professional format. 
The output must follow this structure:

1. A short subtitle (1 sentence) that summarizes the log content.
2. A bulleted list of key points (3–6 items). 
   - Each bullet should describe one accomplishment, task, or learning.
   - Keep the tone formal, clear, and concise.
   - Focus on technical details and avoid unnecessary filler.
3. Do not invent new information. Only use details from the input log.
4. Give it in Turkish.

Formatting:
- Use a clear subtitle (like an H2 heading but don't use ##).
- Use simple dash (-) style bullets.
- Keep each bullet short (1 line).
`;
  const userQuery = `Improve the following log entry into the required format:\n\n${rawContent}`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: {
      parts: [{ text: systemInstruction }],
    },
    tools: [{ google_search: {} }],
  };

  try {
    const response = await axios.post(API_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    // Extract the enhanced text from the response
    const enhancedText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (enhancedText) {
      return enhancedText;
    } else {
      console.error("AI response format is not as expected.");
      return "Enhancement failed: AI response was empty or malformed.";
    }
  } catch (error) {
    console.error(
      "Error enhancing log with AI:",
      error.response?.data || error.message
    );
    return `Enhancement failed: ${error.message}`;
  }
};
