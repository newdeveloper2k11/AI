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
