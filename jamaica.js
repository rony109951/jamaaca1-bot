const fs = require( fs );
const path = require( path );
const { Client } = require( whatsapp-web.js ); // أو المكتبة اللي تستخدمها

const client = new Client();

const commands = {};

// تحميل جميع ملفات الأوامر من مجلد commands
const commandFiles = fs.readdirSync( ./commands ).filter(file => file.endsWith( .js ));

for (const file of commandFiles) {
  const command = require(path.join(__dirname,  commands , file));
  commands[command.name] = command;
}

// تشغيل البوت
client.on( ready , () => {
  console.log( بوت جمايكا شغّال! );
});

// استقبال الرسائل
client.on( message , async (msg) => {
  const prefix =  . ;
  if (!msg.body.startsWith(prefix)) return;

  const args = msg.body.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  let command = commands[commandName];

  // لو الأمر مش موجود في الأسماء الرئيسية، ابحث في aliases
  if (!command) {
    command = Object.values(commands).find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  }

  if (command) {
    try {
      await command.execute(client, msg, args);
    } catch (e) {
      console.error(e);
      await client.sendMessage(msg.from,  حدث خطأ أثناء تنفيذ الأمر. );
    }
  }
});

client.initialize();
