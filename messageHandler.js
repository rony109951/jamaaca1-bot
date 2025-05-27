const fs = require("fs");
const path = require("path");

const developerNumber = "01222843252"; // رقم المطور (نص)

module.exports = async (sock, msg, config) => {
  try {
    const body =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      "";
    const sender = msg.key.participant || msg.key.remoteJid;
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith("@g.us");
    const command = body.startsWith(".")
      ? body.slice(1).split(" ")[0].toLowerCase()
      : "";
    const args = body.trim().split(/\s+/).slice(1);

    // الرد على كلمة "جمايكا"
    if (body.toLowerCase().includes("جمايكا")) {
      if (sender.includes(developerNumber)) {
        await sock.sendMessage(from, { text: "قلب جمايكا🥹🌏" }, { quoted: msg });
      } else {
        await sock.sendMessage(from, { text: "بس ياض" }, { quoted: msg });
      }
    }

    if (!command) return;

    const commandsPath = path.join(__dirname, "commands");
    const files = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const commandFile = require(path.join(commandsPath, file));
      if (
        commandFile.name === command ||
        (commandFile.aliases && commandFile.aliases.includes(command))
      ) {
        return await commandFile.execute(sock, msg, args, config);
      }
    }
  } catch (err) {
    console.error("Error in messageHandler:", err);
  }
};