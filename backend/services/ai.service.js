
const generateResponse = async (message) => {
    const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: process.env.AI_MODEL,
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful AI assistant."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        }
    );

    if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();

    return data.choices[0].message.content;
};

module.exports = { generateResponse };
