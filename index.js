require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { saveMessage, getStatus } = require('./tools');

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

// Matches "/status [channel]"
bot.onText(/\/status (.+)/, async (msg, match) => {
  const channel = match[1]; // the captured "channel"
  const status = await getStatus(channel);
  bot.sendMessage(msg.chat.id, status);
});

// show errors
bot.on('polling_error', (error) => {
  console.error(error);  // => 'EFATAL'
});
