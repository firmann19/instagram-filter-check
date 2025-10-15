// api/sprintpedia.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username } = req.body;

  try {
    const response = await fetch(
      "https://sprintpedia.id/page/instagram_tools",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from Sprintpedia:", error);
    res.status(500).json({ error: "Failed to fetch data from Sprintpedia" });
  }
}
