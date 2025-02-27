import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });

export async function getGroqChatCompletion(location: string) {
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

    return chatCompletion.choices[0]?.message?.content || "No description available.";
  } catch (error) {
    console.error(`Failed to get Groq completion for ${location}:`, error);
    return "Failed to generate description.";
  }
}
