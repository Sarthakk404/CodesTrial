from groq import Groq
import os
import httpx
import random
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MEME_TEMPLATES = {
    "light": [
        ("181913649", "me looking at this code", "at least it runs i guess"),
        ("87743020", "this code", "could be worse i suppose"),
        ("112126428", "this code walking into production", "hoping nobody notices"),
        ("61579", "one does not simply", "write code this questionable"),
        ("131087935", "running this code", "and praying it works"),
    ],
    "medium": [
        ("102156234", "this code", "sent me to therapy"),
        ("87743020", "this code is", "a certified disaster"),
        ("1509839", "your code", "my disappointment"),
        ("438680", "my brain", "after reading this code"),
        ("247375501", "me", "after seeing this variable naming"),
        ("132769734", "senior dev", "reading this code"),
    ],
    "nuclear": [
        ("4087833", "laughing then crying", "at this code"),
        ("102156234", "this code", "ended civilisation"),
        ("196652226", "ight imma head out", "after seeing this monstrosity"),
        ("87743020", "whoever wrote this", "has no future"),
        ("438680", "my will to live", "reading this code"),
        ("1509839", "the code reviewer", "their mental state"),
    ]
}

async def get_meme(roast_text: str, severity: str) -> str:
    templates = MEME_TEMPLATES.get(severity, MEME_TEMPLATES["medium"])
    template_id, top, bottom = random.choice(templates)

    async with httpx.AsyncClient() as http:
        response = await http.post(
            "https://api.imgflip.com/caption_image",
            data={
                "template_id": template_id,
                "username": os.getenv("IMGFLIP_USERNAME"),
                "password": os.getenv("IMGFLIP_PASSWORD"),
                "text0": top,
                "text1": bottom,
                "font": "impact",
            }
        )
        result = response.json()
        if result.get("success"):
            return result["data"]["url"]
        return ""

async def roast_code(code: str, severity: str = "medium") -> dict:
    prompt = f"""
You are a brutally honest senior developer who roasts code like a comedy roast.
Severity level: {severity} (light = funny and mild, medium = savage, nuclear = absolutely destroy it)
Roast this code hard. Be funny, brutal, and specific about what's wrong.
Then at the end give 3 actual improvement suggestions.
Keep it under 200 words.

Code to roast:
{code}
"""
    response = client.chat.completions.create(
        model=os.getenv("GROQ_MODEL"),
        messages=[{"role": "user", "content": prompt}]
    )
    roast_text = response.choices[0].message.content
    meme_url = await get_meme(roast_text, severity)
    return {"roast": roast_text, "meme_url": meme_url}
