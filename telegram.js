const { Telegraf } = require('telegraf');

const bot = new Telegraf('7972427791:AAHcVpppTbZafbFNk07A44CKeKw1ffwWWxk');

bot.start((ctx) => {
  ctx.reply('Вечер в хату!');
});

bot.command('joke', (ctx) => {
  ctx.reply('Почему колобок повесился?');
});

bot.launch();

module.exports = bot;
