const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require( @whiskeysockets/baileys );
const { Boom } = require( @hapi/boom );
const P = require( pino );
const fs = require( fs );
const qrcode = require( qrcode-terminal );

const { state, saveState } = useSingleFileAuthState( ./session.json );

async function startBot() {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({
        version,
        logger: P({ level:  silent  }),
        auth: state
    });

    sock.ev.on( creds.update , saveState);

    // ✅ عرض QR في التيرمنال
    sock.ev.on( connection.update , ({ connection, qr }) => {
        if (qr) {
            qrcode.generate(qr, { small: true }); // يعرض QR في التيرمنال
        }

        if (connection ===  open ) {
            console.log( \n✅ تم الاتصال بنجاح! );
            console.log( المطور: روني البحيره (01222843252) );
        } else if (connection ===  close ) {
            console.log( \n❌ تم قطع الاتصال. إعادة المحاولة... );
            startBot(); // إعادة التشغيل تلقائياً
        }
    });
}

startBot();
