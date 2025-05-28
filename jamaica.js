
const {
  default: makeWASocket,
  DisconnectReason,
  useSingleFileAuthState
} = require( @whiskeysockets/baileys );
const figlet = require( figlet );
const fs = require( fs );
const path = require( path );
const chalk = require( chalk );
const { Boom } = require( @hapi/boom );
const { state, saveState } = useSingleFileAuthState( ./auth_info.json );
const messageHandler = require( ./messageHandler );
const { BOT_NAME, DEVELOPER_NAME, DEVELOPER_NUMBER } = require( ./config );

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false // تم إلغاء هذه الخاصية حسب التحذير
  });

  sock.ev.on( connection.update , (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      console.log(chalk.yellow(`🔒 امسح الـ QR ده بسرعة:\n${qr}`));
    }

    if (connection ===  close ) {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log(chalk.red(`📴 تم فصل الاتصال. إعادة الاتصال: ${shouldReconnect}`));
      if (shouldReconnect) startBot();
    } else if (connection ===  open ) {
      console.log(chalk.green(figlet.textSync(BOT_NAME ||  JAMAICA )));
      console.log(chalk.cyan(`المطور: ${DEVELOPER_NAME} (${DEVELOPER_NUMBER})`));
    }
  });

  sock.ev.on( messages.upsert , async (m) => {
    await messageHandler(sock, m);
  });

  sock.ev.on( creds.update , saveState);
}

startBot();
