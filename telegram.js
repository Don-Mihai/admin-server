const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('7972427791:AAHcVpppTbZafbFNk07A44CKeKw1ffwWWxk');

const fetch = require('node-fetch');

// Замените 'YOUR_BOT_TOKEN' на ваш токен бота
const BOT_TOKEN = '7972427791:AAHcVpppTbZafbFNk07A44CKeKw1ffwWWxk';

// Замените 'YOUR_CHAT_ID' на ID чата, в который вы хотите отправить сообщение
const CHAT_ID = '-3044593076';

// Функция для отправки сообщения
async function sendMessage(message) {
  const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const params = {
    chat_id: CHAT_ID,
    text: message,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
  }
}

bot.start((ctx) => {
  ctx.reply('Вечер в хату!');
});

bot.command('menu', (ctx) => {
  ctx.reply('Выберите действие', {
    reply_markup: {
      keyboard: [[{ text: 'Шутка' }], [{ text: 'Тост' }]],
    },
  });
});

// Функция для получения данных из API
async function getJokeOrToast(type) {
  const url = `https://geek-jokes.sameerkumar.website/api?format=json`;
  const response = await axios.get(url);
  return response.data.joke;
}

// Обработчик для анекдотов
bot.hears('Шутка', async (ctx) => {
  console.log('Анекдот');
  try {
    const joke = await getJokeOrToast(1);
    console.log('joke', joke);
    await sendMessage(joke);
    ctx.reply(joke);
  } catch (error) {
    ctx.reply('Извините, не удалось получить анекдот. Попробуйте позже.');
    console.error('Ошибка при получении анекдота:', error);
  }
});

// Обработчик для тостов
bot.hears('Тост', async (ctx) => {
  try {
    const toast = await getJokeOrToast(6);
    await sendMessage(toast);
    ctx.reply(toast);
  } catch (error) {
    ctx.reply('Извините, не удалось получить тост. Попробуйте позже.');
    console.error('Ошибка при получении тоста:', error);
  }
});

bot.launch();

module.exports = bot;
