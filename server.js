const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Proxy OpenAI requests
app.post('/api/openai', async (req, res) => {
    try {
        const response = await axios({
            method: req.body.method,
            url: `https://api.openai.com/v1/${req.body.endpoint}`,
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            data: req.body.data
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
