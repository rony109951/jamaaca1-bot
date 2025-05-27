رmodule.exports = {
    name:  حول ,
    aliases: [ about ,  bot ],
    description:  معلومات حول البوت ,
    async execute(sock, msg, args) {
        const aboutText = `
*معلومات حول البوت:*

- الاسم: جمايكا
- المطور: روني البحيره
- رقم المطور: 01222843252
- رقم البوت: 01224155567
- البوت يعمل على: Node.js + Termux
- الحالة: شغال بكفاءة

*تم تطوير هذا البوت ليقدم لك تجربة ممتعة وسريعة في إدارة الجروبات والتسلية.*
        `;
        await sock.sendMessage(msg.key.remoteJid, { text: aboutText }, { quoted: msg });
    }
};