require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const sqlite3 = require('sqlite3');

const app = express();
const db = new sqlite3.Database('chat.db');
app.use(cors());
app.use(express.json());

// initialize database
const initDb = () => {
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    message TEXT,
    reply TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
};

initDb();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Save message and reply
const saveMessage = (userId, message, reply) => {
  db.run(
    'INSERT INTO messages (userId, message, reply) VALUES (?, ?, ?)',
    [userId, message, reply]
  );
};

// Bonus: Analyze chat history (placeholder)
const analyzeHistory = () => {
  return new Promise((resolve) => {
    db.all('SELECT message FROM messages', (err, rows) => {
      if (err) return resolve([]);
      const counts = {};
      rows.forEach((row) => {
        counts[row.message] = (counts[row.message] || 0) + 1;
      });
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      resolve(sorted.slice(0, 5));
    });
  });
};

app.post('/chat', async (req, res) => {
  const { message, userId } = req.body;
  if (!message || !userId) {
    return res.status(400).json({ error: 'message and userId required' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: message }
      ]
    });
    const reply = completion.data.choices[0].message.content;
    saveMessage(userId, message, reply);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get reply' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
