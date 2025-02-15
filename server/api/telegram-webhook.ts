import { defineEventHandler, readBody } from 'h3';

interface TelegramUpdate {
  update_id: number;
  message?: {
    chat: {
      id: number;
      first_name: string;
      last_name: string;
    };
    text: string;
  };
}

export default defineEventHandler(async (event) => {
  const body: TelegramUpdate = await readBody(event); // Read incoming update payload

  // Check if the update contains a message
  if (body.message) {
    const chatId = body.message.chat.id; // Extract chat_id
    const messageText = body.message.text; // Get the message text

    console.log(`Received message: "${messageText}" from chat ID: ${chatId}`);

    // Now you can respond back to the user using chatId
    // await sendMessageToChat(chatId, `Thanks for your message! ${body.message.chat.first_name} ${body.message.chat.last_name}`);

    // sessionStorage.setItem('chatId', chatId.toString()); // Store chatId in session storage
    // sessionStorage.setItem('name', `${body.message.chat.first_name} ${body.message.chat.last_name}`); // Store chatId in session storage

    return { statusCode: 200, body: 'OK' }; // Acknowledge Telegram
  }

  return { statusCode: 400, body: 'Bad Request' }; // Handle errors
});

// // Send a message to the user using the Telegram Bot API
// const sendMessageToChat = async (chatId: number, text: string) => {
//   const { botToken } = useRuntimeConfig().public;
//   const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

//   await fetch(url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ chat_id: chatId, text }), // Send message to the user
//   });
// };
