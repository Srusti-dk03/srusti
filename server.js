import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { topic } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Explain "${topic}" in very simple words.
Then create exactly 3 MCQs with 4 options.
Finally give the correct answers.`
      })
    });

    const data = await response.json();

    const text =
      data.output?.[0]?.content?.[0]?.text || "No response from AI";

    res.json({ reply: text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI API failed" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
