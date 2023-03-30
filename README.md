# lantern-scrapper-bot

Telegram channel bot scraper that saves the content locally:
- messages into raw json
- media (photo/video)
- documents

To make it happen you just need to invite your bot to the channel! Easy!

If you write directly to the bot with inline command `/status {channel}`,
it responds with the count of stored messages for the given channel.

File format
- for messages is `{YYYY-MM-DD_HH-mm-ss}_{message_id}`
- for media and files `{YYYY-MM-DD_HH-mm-ss}_{file_id}`

## Development

1. copy `.env.example` file for your local `.env` and set vars
2. create your telegram bot by [instruction](/telegram-bot.md)
3. `npm i`
4. Check that you have folder `data` in the root of the app
5. `npm run dev` (it requires nodemon)

## Production

1. copy `.env.example` file for your local `.env` and set vars
2. create your telegram bot by [instruction](/telegram-bot.md)
3. `npm i`
4. Check that you have folder `data` in the root of the app
5. `pm2 start index.js` (it requires pm2)
