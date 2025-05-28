const fs = require("fs");
const path = require("path");
const { Client, LocalAuth } = require("whatsapp-web.js");

// إنشاء العميل باستخدام المصادقة المحلية
const client = new Client({
  authStrategy: new LocalAuth(),
});

const commands = {};

// تحميل جميع ملفات الأوامر من مجلد commands
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(__dirname, "commands", file));
  commands[command.name] = command;
}

// عند تشغيل البوت
client.on("ready", () => {
  console.log("✅ بوت جمايكا شغّال!");
});

// استقبال الرسائل
client.on("message", async (msg) => {
  const prefix = ".";
  if (!msg.body.startsWith(prefix)) return;

  const args = msg.body.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  let command = commands[commandName];

  // لو مش لاقي الأمر بالاسم، شوف aliases
  if (!command) {
    command = Object.values(commands).find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  }

  if (command) {
    try {
      await command.execute(client, msg, args);
    } catch (e) {
      console.error("❌ خطأ أثناء تنفيذ الأمر:", e);
      await client.sendMessage(msg.from, { text: "❌ حدث خطأ أثناء تنفيذ الأمر." });
    }
  }
});

// بدء تشغيل البوت
client.initialize();
