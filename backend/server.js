const express = require("express")
const cors = require("cors");;

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

// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
