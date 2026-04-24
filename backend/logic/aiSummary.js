import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateTeamSummary(team, analysis) {
  const response = await openai.responses.create({
    model: "gpt-5.4-mini",
    input: [
      {
        role: "system",
        content:
          "You are a concise Pokemon team analysis assistant. Summarise the team's biggest risks and practical improvements. Keep it under 120 words. Do not mention exact APIs or backend implementation."
      },
      {
        role: "user",
        content: JSON.stringify({
          team,
          recommendations: analysis.recommendations,
          defensiveAnalysis: analysis.defensiveAnalysis,
          offensiveCoverage: analysis.offensiveCoverage
        })
      }
    ]
  });

  return response.output_text;
}