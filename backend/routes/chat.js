const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Please enter a legal question."
      });
    }

    const prompt = `
You are Legal Saarthi, an AI legal assistant for India.

Rules:
- Answer only legal questions.
- Use simple English.
- Keep answers short (100-150 words).
- Mention that users should consult a qualified lawyer for official legal advice.
- If the question is not legal, politely say that you only answer legal queries.

User Question:
${message}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    res.json({
      reply: result.text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "Server Error. Please try again later."
    });
  }
});

module.exports = router;