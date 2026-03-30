import httpx
import os

async def fetch_github_code(repo_url:str) -> str:
    parts = repo_url.rstrip('/').split('/')
    owner = parts[-2]
    repo = parts[-1]

    api_url = f"https://api.github.com/repos/{owner}/{repo}/contents"

    async with httpx.AsyncClient() as client:
        respone = await client.get(api_url)
        files=respone.json()
        code = ""

        for file in files:
            if file["name"].endswith((".py", ".js", ".ts", ".jsx", ".tsx", ".html", ".css")):   
                file_response = await client.get(file['download_url'])
                code += f"\n\n# File: {file['name']}\n"

        return code if code else "No Valid files found in the repository."
    