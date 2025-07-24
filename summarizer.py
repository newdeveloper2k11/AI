from dotenv import load_dotenv
import os
import openai

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def summarize_document(text: str, *, model: str = "gpt-3.5-turbo") -> str:
    """Summarize the provided text using OpenAI."""
    if not openai.api_key:
        raise RuntimeError("OPENAI_API_KEY environment variable not set")

    messages = [
        {"role": "system", "content": "You summarize text provided by the user."},
        {"role": "user", "content": f"Summarize the following text:\n{text}"}
    ]

    response = openai.ChatCompletion.create(model=model, messages=messages)
    return response.choices[0].message.content.strip()

if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage: python summarizer.py <path_to_text_file>")
        raise SystemExit(1)

    file_path = sys.argv[1]
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    summary = summarize_document(content)
    print(summary)
