import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    console.log("Fetching data for username:", username);

    const response = await fetch("https://sprintpedia.id/api/instagram_tools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json, text/plain, */*",
        Origin: "https://sprintpedia.id",
        Referer: "https://sprintpedia.id/page/instagram_tools",
      },
      body: JSON.stringify({ username }),
    });

    const text = await response.text();
    console.log("Raw response:", text);

    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch {
      console.error("Failed to parse JSON:", text);
      return res
        .status(500)
        .json({ error: "Invalid JSON from Sprintpedia", raw: text });
    }
  } catch (error: any) {
    console.error("Error fetching from Sprintpedia:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch data from Sprintpedia", details: error });
  }
}
