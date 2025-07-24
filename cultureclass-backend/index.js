const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const QLOO_API_KEY = process.env.QLOO_API_KEY;

async function getQlooSuggestion(input, type) {
  try {
    const response = await fetch("https://api.qloo.com/v1/suggestions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${QLOO_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ type, input })
    });

    const data = await response.json();
    return data[0]?.name || input;
  } catch (err) {
    console.error(`Qloo API error for ${type}:`, err.message);
    return input;
  }
}

app.post('/generate-path', async (req, res) => {
  const { movie, artist, food, book, topic } = req.body;

  // ✅ Now this is inside an async route
  const refinedMovie = await getQlooSuggestion(movie, "movie");
  const refinedArtist = await getQlooSuggestion(artist, "music");
  const refinedFood = await getQlooSuggestion(food, "food");
  const refinedBook = await getQlooSuggestion(book, "book");

  const prompt = `
You are an AI educator. Create a personalized 4-step learning plan to teach "${topic}" based on the user's favorite:

- Movie: ${refinedMovie}
- Music Artist: ${refinedArtist}
- Food: ${refinedFood}
- Book: ${refinedBook}

Each step should have a title and a short paragraph (less than 300 characters). Make it engaging and culturally relevant.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const text = completion.choices[0].message.content;

    res.json({ stepsText: text });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
