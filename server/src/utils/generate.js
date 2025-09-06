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
  const systemInstruction =
    "You are an AI assistant designed to help interns write professional and well-structured daily logs. Your goal is to take a user's informal log entry and transform it into a concise, professional, and clear summary. Maintain a formal tone and focus on key accomplishments and technical details. Do not add any new information.";
  const userQuery = `Enhance the following log entry:\n\n${rawContent}`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: {
      parts: [{ text: systemInstruction }],
    },
    tools: [{ google_search: {} }],
  };

  console.log("Calling API...");
  try {
    const response = await axios.post(API_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    // Extract the enhanced text from the response
    const enhancedText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (enhancedText) {
      console.log("Enhancement successful.");
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
