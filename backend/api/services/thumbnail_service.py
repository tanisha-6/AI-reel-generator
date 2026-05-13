# import os
# import json
# import requests

# from dotenv import load_dotenv

# load_dotenv()

# OPENROUTER_API_KEY = os.getenv(
#     "OPENROUTER_API_KEY"
# )


# def generate_thumbnail_variations(topic, title):

#     prompt = f"""
#     Generate 3 viral YouTube thumbnail prompts.

#     Topic: {topic}
#     Title: {title}

#     Return ONLY valid JSON.

#     Format:

#     {{
#       "thumbnails": [
#         {{
#           "label": "",
#           "prompt": ""
#         }}
#       ]
#     }}
#     """

#     response = requests.post(

#         url="https://openrouter.ai/api/v1/chat/completions",

#         headers={
#             "Authorization": f"Bearer {OPENROUTER_API_KEY}",
#             "Content-Type": "application/json",
#         },

#         json={
#             "model": "google/gemini-2.0-flash-001",

#             "response_format": {
#                 "type": "json_object"
#             },

#             "messages": [
#                 {
#                     "role": "user",
#                     "content": prompt
#                 }
#             ]
#         }
#     )

#     result = response.json()

#     content = result["choices"][0]["message"]["content"]

#     data = json.loads(content)

#     thumbnails = []

#     for item in data["thumbnails"]:

#         image_prompt = item["prompt"]

#         image_url = (
#             "https://image.pollinations.ai/prompt/"
#             + image_prompt.replace(" ", "%20")
#         )

#         thumbnails.append({
#             "label": item["label"],
#             "image_url": image_url
#         })

#     return thumbnails




# import os
# import json
# import requests
# import urllib.parse

# from dotenv import load_dotenv

# load_dotenv()

# OPENROUTER_API_KEY = os.getenv(
#     "OPENROUTER_API_KEY"
# )


# def generate_thumbnail_variations(topic, title):

#     prompt = f"""
#     Generate ONLY valid JSON.

#     Create 3 SHORT AI image prompts
#     for viral YouTube thumbnails.

#     Topic: {topic}
#     Title: {title}

#     Keep prompts SHORT.
#     Max 8 words each.

#     Format:

#     {{
#       "thumbnails": [
#         {{
#           "label": "",
#           "prompt": ""
#         }}
#       ]
#     }}
#     """

#     try:

#         response = requests.post(

#             url="https://openrouter.ai/api/v1/chat/completions",

#             headers={
#                 "Authorization": f"Bearer {OPENROUTER_API_KEY}",
#                 "Content-Type": "application/json",
#             },

#             json={

#                 "model": "google/gemini-2.0-flash-001",

#                 "response_format": {
#                     "type": "json_object"
#                 },

#                 "messages": [
#                     {
#                         "role": "user",
#                         "content": prompt
#                     }
#                 ]
#             }
#         )

#         result = response.json()

#         content = result["choices"][0]["message"]["content"]

#         data = json.loads(content)

#         thumbnails = []

#         for item in data["thumbnails"]:

#             short_prompt = item["prompt"]

#             encoded_prompt = urllib.parse.quote(
#                 short_prompt
#             )

#             image_url = (
#                 f"https://image.pollinations.ai/prompt/{encoded_prompt}"
#             )

#             thumbnails.append({

#                 "label": item["label"],

#                 "image_url": image_url
#             })

#         return thumbnails

#     except Exception as e:

#         print("THUMBNAIL ERROR:")
#         print(e)

#         return [
#             {
#                 "label": "AI Thumbnail",
#                 "image_url":
#                 "https://image.pollinations.ai/prompt/AI%20thumbnail"
#             }
#         ]


import urllib.parse
import random

def generate_thumbnail_variations(topic, title):
    prompts = [
        f"viral youtube thumbnail for {topic}, high quality, 4k",
        f"cinematic influencer style thumbnail about {title}, vibrant colors",
        f"3d render social media thumbnail for {topic}, professional lighting"
    ]

    thumbnails = []

    for index, prompt in enumerate(prompts):
        # Generate a random seed to ensure unique images every time
        seed = random.randint(1, 100000)
        encoded_prompt = urllib.parse.quote(prompt)

        # Pollinations works best with these parameters for aspect ratio
        image_url = (
            f"https://image.pollinations.ai/prompt/{encoded_prompt}"
            f"?width=1280&height=720&nologo=true&seed={seed}"
        )

        thumbnails.append({
            "label": f"Variation {index + 1}",
            "image_url": image_url
        })

    return thumbnails


# import os
# import base64

# from google import genai
# from dotenv import load_dotenv

# load_dotenv()

# client = genai.Client(
#     api_key=os.getenv("GEMINI_API_KEY")
# )


# def generate_thumbnail_variations(topic, title):

#     prompts = [

#         f"viral youtube thumbnail about {topic}",

#         f"cinematic social media thumbnail for {title}",

#         f"high quality influencer thumbnail {topic}"
#     ]

#     thumbnails = []

#     for index, prompt in enumerate(prompts):

#         try:

#             response = client.models.generate_images(

#                 model="imagen-3.0-generate-002",

#                 prompt=prompt
#             )

#             image_bytes = response.generated_images[0].image.image_bytes

#             base64_image = base64.b64encode(
#                 image_bytes
#             ).decode("utf-8")

#             image_url = (
#                 f"data:image/png;base64,{base64_image}"
#             )

#             thumbnails.append({

#                 "label": f"Thumbnail {index + 1}",

#                 "image_url": image_url
#             })

#         except Exception as e:

#             print("GEMINI IMAGE ERROR:")
#             print(e)

#     return thumbnails