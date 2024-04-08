"use client"

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/completions"; // Corrected endpoint

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { input } = req.body;

    try {
      console.log(OPENAI_API_KEY);

      const response = await axios.post(
        OPENAI_API_ENDPOINT,
        {
          model : "text-davinci-002",
          prompt: input,
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      console.log("OpenAI API response:", response.data);

      const output = response.data.choices[0]?.text?.trim() || "Sorry, I do not understand.";
      res.status(200).json({ output });
    } catch (error) {
      console.error("Error during API request:", error.response.data);
      res.status(500).json({ error: error.response.data });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
