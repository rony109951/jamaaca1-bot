const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const chalk = require('chalk');
const figlet = require('figlet');
const { Boom } = require('@hapi/boom');
const messageHandler = require('./messageHandler');

const BOT_NAME = 'جمايكا';
const OWNER_NAME = 'روني البحيره';
const OWNER_NUMBER = '01222843252';
const BOT_NUMBER = '01224155567';

async function startBot() {
  // حفظ الجلسة في مجلد auth
  const { state, saveCreds } = await useMultiFileAuthState('./auth');

  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    auth: state,
    version,
    logger: pino({ level: 'silent' }),
    browser: [BOT_NAME, 'Safari', '1.0.0'],
  });

  // تحديث بيانات الجلسة عند تغييرها
  sock.ev.on('creds.update', saveCreds);

  // استقبال الرسائل
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;
    await messageHandler(sock, msg, { BOT_NAME, OWNER_NAME, OWNER_NUMBER });
  });

  // متابعة حالة الاتصال
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      // هنا يمكنك طباعة QR بشكل مختلف أو حفظه، مثلاً:
      console.log(chalk.yellow('تم استقبال QR — يرجى مسحه عبر واتساب')); 
      // لكن لأنك تريد بدون QR، لا تفعل شيء هنا أو تعامل الجلسة مسبقًا.
    }

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect &&
        Boom.isBoom(lastDisconnect.error) &&
        lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) {
        console.log(chalk.yellowBright('إعادة الاتصال...'));
        startBot();
      } else {
        console.log(chalk.redBright('تم تسجيل خروج البوت، يرجى إعادة المصادقة'));
      }
    } else if (connection === 'open') {
      console.log(chalk.greenBright(`${BOT_NAME} متصل بنجاح!`));
    }
  });

  console.log(chalk.green(figlet.textSync(BOT_NAME)));
  console.log(chalk.cyan(`المطور: ${OWNER_NAME} (${OWNER_NUMBER})`));
}

startBot();
