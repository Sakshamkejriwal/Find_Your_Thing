import { GoogleGenerativeAI } from "@google/generative-ai";

// Use VITE_ prefix for environment variables to be accessible in the client
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Analyzes an image of a found item and returns suggested details.
 * @param {string} base64Image - The base64 string of the image (with data prefix).
 * @param {string[]} categories - The list of valid categories.
 * @returns {Promise<{name: string, category: string, description: string}>}
 */
export async function analyzeFoundItem(base64Image, categories) {
  if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
    console.warn("Gemini API Key is missing. Skipping auto-fill.");
    return null;
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    // Remove the data:image/jpeg;base64, prefix
    const base64Data = base64Image.split(",")[1];

    const prompt = `
      You are a campus lost-and-found assistant. 
      Analyze the provided image of an item found on campus.
      Suggest a short name, a category, and a brief description.
      if an item is Keychain, it is most probably be a set of Room Keys.
      if there is any sticker on the item, add details regarding stickers as well.

      The category MUST be exactly one of these: ${categories.join(", ")}.
      
      Response format (JSON):
      {
        "name": "string",
        "category": "string",
        "description": "string"
      }
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown code blocks in response
    const cleanedText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    throw error;
  }
}
