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
    const response = await fetch(
      `https://sprintpedia.id/page/instagram_tools?username=${username}`,
      {
        method: "GET",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    const html = await response.text();
    res.status(200).send(html);
  } catch (error) {
    console.error("Error fetching from Sprintpedia:", error);
    res.status(500).json({ error: "Failed to fetch data from Sprintpedia" });
  }
}
