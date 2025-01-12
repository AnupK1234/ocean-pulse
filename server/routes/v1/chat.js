const express = require("express");
const axios = require("axios");
const { groq } = require("../../config/groq");

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { userMessage, previousMessages } = req.body;
    const messages = [
      { role: "system", content: "You are a water conservation assistant." },
      ...previousMessages.map((msg) => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.text,
      })),
      { role: "user", content: userMessage },
    ];

    const groqResponse = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages,
    });

    const aiMessage = groqResponse.choices[0]?.message?.content;
    if (aiMessage) {
      res.json({ message: aiMessage });
    } else {
      res.status(500).json({ error: "No message received from AI" });
    }
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

module.exports = router;
