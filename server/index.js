import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

app.post("/api/chat", async (req, res) => {
  try {
    const { question } = req.body

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant for international students in the UK. Give practical, safe, simple advice.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    })

    res.json({ answer: response.choices[0].message.content })
  } catch (error) {
    console.error("OPENAI ERROR:", error)
    res.status(500).json({
      error: error.message || "AI service failed.",
    })
  }
})

app.get("/", (req, res) => {
  res.send("Backend server is running")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})