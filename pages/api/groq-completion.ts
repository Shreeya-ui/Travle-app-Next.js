// /pages/api/groq-completion.ts
import Groq from "groq-sdk";
import { NextApiRequest, NextApiResponse } from "next";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { location } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Describe the best tourist attractions and cultural highlights in ${location}.`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const content = chatCompletion.choices[0]?.message?.content || "No description available.";
    res.status(200).json({ content });
  } catch (error) {
    console.error("Error fetching Groq completion:", error);
    res.status(500).json({ error: "Failed to fetch Groq completion." });
  }
}
