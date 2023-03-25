require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { saveMessage } = require('./tools');

const token = process.env.TELEGRAM_BOT_ACCESS_TOKEN;

if (!token) {
  console.log('Please set the TELEGRAM_BOT_ACCESS_TOKEN environment variable');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
console.log('bot is listening');

// Listen for messages
bot.on('channel_post', (msg) => {
  saveMessage({ bot, msg });
});

// Listen for edited messages
bot.on('edited_channel_post', (msg) => {
  saveMessage({ bot, msg });
});

// show errors
bot.on('polling_error', (error) => {
  console.error(error);  // => 'EFATAL'
});
