const express = require("express")
const cors = require("cors");
require("dotenv").config();

const { generateResponse } = require("./services/ai.service");

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

// Middleware
app.use(express.json());

// First API
app.get("/", (req, res) => {
    res.json("Welcome to Chat System Backend!");
});

app.get('/api/health', (req, res) => {
    res.json({
        "status": "success",
        "message": "Server is healthy"
    })
})

app.get('/api/chat', (req, res) => {
    res.json({
        "message": "Welcome to Chat API",
        "totalMessages": 0
    })
})

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        const aiResponse = await generateResponse(message);

        res.json({
            status: "success",
            data: {
                message: aiResponse
            }
        });

    } catch (error) {
        console.error("AI Error:", error);

        res.status(500).json({
            message: "Failed to generate AI response"
        });
    }
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
