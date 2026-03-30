from pydantic import BaseModel

class Prompt(BaseModel):
    code: str
    severity: str = "medium"

class RoastResponse(BaseModel):
    roast: str
    meme_url: str