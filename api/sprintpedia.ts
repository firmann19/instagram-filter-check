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
    console.log("Proxying to sprintpedia-proxy for username:", username);

    const response = await fetch(
      "https://sprintpedia-proxy.vercel.app/api/sprintpedia",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Upstream error:", text);
      return res.status(response.status).json({
        error: `Sprintpedia proxy returned ${response.status}`,
        raw: text,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: unknown) {
    console.error("Error fetching from Sprintpedia Proxy:", error);
    return res.status(500).json({
      error: "Failed to fetch data from Sprintpedia Proxy",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
