from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from roaster import roast_code
from github import fetch_github_code
from schemas.schemas import Prompt, RoastResponse



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://codes-trial.vercel.app", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/roast")
async def roast_code_endpoint(prompt: Prompt) -> RoastResponse:
    roast_result = await roast_code(prompt.code, prompt.severity)
    return RoastResponse(roast=roast_result["roast"], meme_url=roast_result["meme_url"])

@app.post("/roast-github")
async def roast_github_code(repo_url: str, severity: str = "medium") -> RoastResponse:
    code = await fetch_github_code(repo_url)
    roast_result = await roast_code(code, severity)
    return RoastResponse(roast=roast_result["roast"], meme_url=roast_result["meme_url"])