import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")


def generate_ai_script(data):

    topic = data.get("topic")
    niche = data.get("niche")
    platform = data.get("platform")
    content_style = data.get("content_style")

    prompt = f"""
    You are a viral short-form video content AI.

    Generate ONLY pure valid JSON.

    DO NOT:
    - add explanations
    - add markdown
    - add ```json
    - add text before or after JSON

    Topic: {topic}
    Niche: {niche}
    Platform: {platform}
    Content Style: {content_style}

    Return this exact structure:

    {{
      "title": "",
      "hook": "",
      "script": "",
      "cta": "",
      "hashtags": [],
      "scenes": [
            {{
                "scene_number": 1,
                "scene_title": "",
                "scene_description": ""
            }},
            {{
                "scene_number": 2,
                "scene_title": "",
                "scene_description": ""
            }},
            {{
                "scene_number": 3,
                "scene_title": "",
                "scene_description": ""
            }},
            {{
                "scene_number": 4,
                "scene_title": "",
                "scene_description": ""
            }}
        ]
    }}
    """

    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",

        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },

        json={
            "model": "openai/gpt-3.5-turbo",

            "response_format": {
                "type": "json_object"
            },

            "temperature": 0.7,

            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }
    )

    result = response.json()

    print(result)

    if "choices" not in result:

        return {
            "title": "Error",
            "hook": "AI generation failed",
            "script": str(result),
            "cta": "",
            "hashtags": [],
            "scenes": []
        }

    content = result["choices"][0]["message"]["content"]

    try:

        parsed_json = json.loads(content)

        return parsed_json

    except Exception as e:

        print("JSON PARSE ERROR:")
        print(e)

        return {
            "title": "AI Generated Script",
            "hook": "Parsing failed",
            "script": content,
            "cta": "Follow for more",
            "hashtags": ["ai", "content"],
            "scenes": []
        }