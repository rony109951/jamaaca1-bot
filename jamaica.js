
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require( @whiskeysockets/baileys );
const pino = require( pino );
const fs = require( fs );
const path = require( path );
const figlet = require( figlet );
const chalk = require( chalk );
const { Boom } = require( @hapi/boom );
const messageHandler = require( ./messageHandler );

const BOT_NAME =  جمايكا ;
const OWNER_NAME =  روني البحيره ;
const OWNER_NUMBER =  01222843252 ;
const BOT_NUMBER =  01224155567 ;

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState( auth );
    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({
        logger: pino({ level:  silent  }),
        sock.ev.on( connection.update , (update) => {
  const { connection, lastDisconnect, qr } = update;

  if (qr) {
    console.log( امسح رمز QR هذا من واتساب: );
    console.log(qr);
  }

  if (connection ===  close ) {
    const shouldReconnect =
      lastDisconnect &&
      Boom.isBoom(lastDisconnect.error) &&
      lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;

    if (shouldReconnect) {
      console.log( جار إعادة الاتصال... );
      startBot();
    } else {
      console.log( تم تسجيل خروج البوت، يرجى إعادة المصادقة. );
    }
  } else if (connection ===  open ) {
    console.log( البوت متصل بنجاح! );
  }
});
        auth: state,
        version,
        browser: [ Jamaica ,  Safari ,  1.0.0 ]
    });

    sock.ev.on( messages.upsert , async ({ messages, type }) => {
        if (type !==  notify ) return;
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;
        await messageHandler(sock, msg, { BOT_NAME, OWNER_NAME, OWNER_NUMBER });
    });

    sock.ev.on( connection.update , (update) => {
        const { connection, lastDisconnect } = update;
        if (connection ===  close ) {
            const shouldReconnect = (lastDisconnect.error = Boom.isBoom(lastDisconnect?.error))
                ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
                : true;
            if (shouldReconnect) {
                console.log(chalk.yellowBright( Reconnecting... ));
                startBot();
            } else {
                console.log(chalk.redBright( Bot logged out. ));
            }
        }
    });

    sock.ev.on( creds.update , saveCreds);

    console.log(chalk.green(figlet.textSync(BOT_NAME)));
    console.log(chalk.cyan(`المطور: ${OWNER_NAME} (${OWNER_NUMBER})`));
}

startBot();
