# AI Chatbot Backend

This repository now includes a simple Node.js + Express server that connects to the OpenAI API and stores chats in SQLite.

## Setup
1. Ensure Node.js is installed.
2. Install dependencies (requires network access):
   ```bash
   npm install
   ```
3. Create a `.env` file with your OpenAI key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API
- **POST /chat**: Send `{ "message": "hello", "userId": "123" }` and receive `{ "reply": "..." }`.

Chat history is stored in `chat.db` for future analysis.

## Text Summarizer (Python)
This repo also includes a small Python script, `summarizer.py`, which leverages
OpenAI's API to summarize a text file.

1. Install the required dependencies (needs internet access):
   ```bash
   pip install openai python-dotenv
   ```
2. Ensure your `.env` file contains `OPENAI_API_KEY` as shown above.
3. Run the script with the path to a text file:
   ```bash
   python summarizer.py document.txt
   ```
