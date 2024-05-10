const express = require('express');
const http = require('http');
const mc = require('minecraft-protocol');
const autoVersionForge = require('minecraft-protocol-forge').autoVersionForge;

const app = express();
const server = http.createServer(app);

// Express uygulaması
app.get('/', (req, res) => {
    res.send('<h1>Sistem Aktif</h1>');
});

// Minecraft botu
const bot = mc.createClient({
    version: false,
    host: "emerald.magmanode.com",
    port: 27792,
    username: "mamibot"
});

bot.on('login', () => {
    console.log('Bot is connected to the server');
    setInterval(() => {
        bot.emit('jump');
    }, 1000); // Bot her saniyede bir zıplıyor
});

bot.on('end', () => {
    console.log('Bot disconnected from the server');
});
autoVersionForge(bot);
app.get('/mamijoin', (req, res) => {
    autoVersionForge(bot);
    res.send('<h1>Sunucuya katılma isteği gönderildi</h1>');
});
// Sunucu başlatma
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
