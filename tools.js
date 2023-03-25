const fs = require('fs');
const path = require('path');
const moment = require('moment');

const dateFormat = 'YYYY-MM-DD_HH-mm-ss';

/**
 * Check if the folder exists, if not, create it
 * @param {string} folderName 
 */
async function checkFolder(folderName) {
  try {
    await fs.promises.access(folderName);
  } catch (error) {
    await fs.promises.mkdir(folderName, { recursive: true });
    await fs.promises.mkdir(`${folderName}/messages`);
    await fs.promises.mkdir(`${folderName}/media`);
    await fs.promises.mkdir(`${folderName}/documents`);
  }
}

/**
 * Download a file
 * @param {Object} bot Telegram bot instance
 * @param {Object} file file info
 * @param {string} folderName where the file will be saved
 * @param {string} date date of the message
 */
async function download({ bot, file, folderName, date }) {
  const filePath = await bot.downloadFile(file.file_id, `${folderName}`); 
  const fileExt = path.extname(filePath);
  const properFilePath = `${folderName}/${date}_${file.file_unique_id}${fileExt}`;
  await fs.promises.rename(filePath, properFilePath)
  console.log(`File saved to ${properFilePath}`);
}

/**
 * 
 * @param {Object} bot Telegram bot instance
 * @param {Object} msg Telegram message
 */
module.exports.saveMessage = async ({ bot, msg }) => {
  // define folder for the current channel
  const folderName = path.resolve(__dirname, `./data/${msg.sender_chat.username}`);
  // prepare formatted date
  const msgDate = moment.unix(msg.date).format(dateFormat)

  // Create the folder for the channel if it doesn't exist
  await checkFolder(folderName); // Create the folder for the channel

  // Save the message to a JSON file
  const fileName = `${msgDate}_${msg.message_id}`;
  const filePath = `${folderName}/messages/${fileName}.json`;
  await fs.promises.writeFile(filePath, JSON.stringify(msg, null, 2));
  console.log(`Message saved to ${filePath}`);

  // If the message contains a photo, video or document then download it to a specific folder
  if (msg.photo) {
    await Promise.all(msg.photo.map((file) => download({
      bot,
      file,
      folderName: `${folderName}/media`,
      date: msgDate,
    })));
  }
  if (msg.video) {
    const file = msg.video;
    await download({
      bot,
      file,
      folderName: `${folderName}/media`,
      date: msgDate,
    });
  }
  if (msg.document) {
    const file = msg.document;
    await download({
      bot,
      file,
      folderName: `${folderName}/documents`,
      date: msgDate,
    });
  }
};
