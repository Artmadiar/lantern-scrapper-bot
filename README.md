# lantern-scrapper-bot

Telegram channel bot scraper that saves the content locally:
- messages into json files in the format
- media (photo/video)
- documents

To make it happen you just need to invite your bot to the channel! Easy!

File format
- for messages is `{YYYY-MM-DD_HH-mm-ss}_{message_id}`
- for media and files `{YYYY-MM-DD_HH-mm-ss}_{file_id}`

## Development

1. copy .env.example file for your local .env and set vars
2. npm i
3. npm run dev (it requires nodemon)

## Production

1. copy .env.example file for your local .env and set vars
2. npm i
3. pm2 start (it requires pm2)
