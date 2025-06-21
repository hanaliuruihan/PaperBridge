const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      'https://api.llama.com/v1/chat/completions',
      {
        model: "Llama-4-Maverick-17B-128E-Instruct-FP8",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.LLAMA_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("LLaMA API error:", err.response?.data || err.message);
    res.status(500).json({ error: "LLaMA API request failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
