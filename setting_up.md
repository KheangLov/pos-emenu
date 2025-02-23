Here's the updated document that includes the **mini-app registration** with the Telegram bot:

---

# **Setting Up a Nuxt 3 Web App as a Telegram Mini App**

This guide explains how to set up a **Nuxt 3 web app** as a **Telegram Mini App**. The process involves creating a Nuxt 3 application, setting up a Telegram bot, and integrating the bot with the Nuxt 3 app, allowing users to interact with it directly within Telegram.

---

## **1. Prerequisites**

- **Hosted Nuxt 3 web app**
- **Telegram Account** (to create a bot)

---

## **2. Create and Configure Nuxt 3 for Deployment**

We can customize the base URL for the app. For using the app as a subpath (`/emenu`), edit the `nuxt.config.ts` as follows:

```ts
export default defineNuxtConfig({
  app: {
    baseURL: '/emenu',
  }
})
```

or

```env
NUXT_APP_BASE_URL= 
```

Then, build the Nuxt app:

```bash
npm run build
```

---

## **3. Set Up the Telegram Bot**

### 3.1 Create a Telegram Bot

1. Open **Telegram** and search for **BotFather**.
2. Type `/start` and then `/newbot` to create a new bot.
3. Follow the instructions to give the bot a name and a username.
4. After creation, **BotFather** will provide us with an **API Token**. Keep it safe as we will need it to interact with the Telegram Bot API.

### 3.2 Set up a Webhook

For the bot to interact with the Nuxt 3 app, we need to configure a webhook that will allow Telegram to send updates to the server. A webhook will ensure that when a user interacts with the bot, the relevant actions are processed in the app.

To set up a webhook with the Nuxt 3 app:

1. **Host the app publicly**: Deploy the Nuxt 3 app using a server, so that it’s publicly accessible via HTTPS.
2. **Set up the Webhook URL**: Set the webhook for the bot by sending a request to the Telegram Bot API:

   ```bash
   https://api.telegram.org/bot<bot-token>/setWebhook?url=https://<domain>/webhook
   ```

   Replace `<bot-token>` with the token we got from BotFather, and `<domain>` with the URL where the app is hosted.

---

## **4. Register Mini-App URL with the Telegram Bot**

To register the **Mini App URL** for the bot:

1. In **BotFather**, we will use the `/setdomain` command to link the mini-app URL with our bot.
   
   - Run `/setdomain` in **BotFather**.
   - BotFather will prompt for the **domain** of the mini app. We provide the **HTTPS URL** where our Nuxt 3 app is hosted.

2. After registering the **mini-app URL**, we can use this URL in inline buttons or commands to allow users to access the mini app directly within Telegram.

---

## **5. Connect the Nuxt 3 App with the Telegram Bot**

To interact with the Telegram API and create the necessary user interactions, we’ll need to handle messages and commands that come from Telegram.

### 5.1 Create a Webhook Route for the Bot

In the Nuxt 3 app, create an API route (in the `server/api` directory) to handle incoming messages from Telegram.

**File structure:**

```
/server/api/webhook.ts
```

Inside `webhook.ts`, set up the handler:

```ts
import { defineEventHandler, useBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await useBody(event);

  if (body.message) {
    const userMessage = body.message.text;
    const userId = body.message.from.id;

    // Process message and send reply back
    if (userMessage === '/start') {
      await sendMessage(userId, 'Welcome to the Telegram Mini App!');
    }

    // More commands here
  }

  return { status: 'ok' };
});

async function sendMessage(userId: string, message: string) {
  const botToken = '<bot-token>';
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const payload = {
    chat_id: userId,
    text: message,
  };

  await $fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
```

This webhook handler processes the incoming Telegram message and sends a response back using the `sendMessage` function.

### 5.2 Handling Other Interactions

We can expand the webhook functionality to handle additional interactions. For example:

- **User Input Handling**: Ask users for input (e.g., name, preferences).
- **Buttons and Keyboard Interactions**: Use inline buttons or custom keyboards to allow users to interact with the bot.

---

## **6. Telegram Mini App Interactions**

### 6.1 Sending Inline Buttons and Commands

We can send **inline buttons** or **command responses** in the bot. For example:

```ts
async function sendInlineKeyboard(userId: string) {
  const botToken = '<bot-token>';
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const payload = {
    chat_id: userId,
    text: 'Choose an option:',
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Option 1', callback_data: 'option_1' }],
        [{ text: 'Option 2', callback_data: 'option_2' }],
      ],
    },
  };

  await $fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
```

### 6.2 Handle Button Presses

In the webhook, we can listen for **callback queries** when the user clicks a button:

```ts
if (body.callback_query) {
  const userId = body.callback_query.from.id;
  const callbackData = body.callback_query.data;

  if (callbackData === 'option_1') {
    await sendMessage(userId, 'Selected Option 1');
  } else if (callbackData === 'option_2') {
    await sendMessage(userId, 'Selected Option 2');
  }
}
```

---

## **7. Test the Telegram Mini App**

Once everything is set up:

1. Test the bot by searching for it in Telegram and starting a conversation.
2. Check if the interaction flow works: sending commands, receiving responses, and handling inline buttons.

---

## **8. Deploy the App**

Once the bot is connected and the webhook is set up, we can deploy the Nuxt 3 app.
Ensure deployment is accessible via HTTPS, as Telegram requires the webhook URL to be secure.

---

## **9. Conclusion**

We’ve successfully set up a **Nuxt 3 web app** as a **Telegram Mini App**. This integration allows the app to communicate with users directly inside Telegram. We can expand the functionality by adding more features, improving user interaction, and adding more Telegram API integrations.

--- 

## **10. References