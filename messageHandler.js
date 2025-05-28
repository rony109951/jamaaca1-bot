module.exports = async (sock, m) => { const msg = m.messages[0]; if (!msg.message) return;

const text = msg.message.conversation || msg.message.extendedTextMessage?.text; const sender = msg.key.remoteJid;

if (!text) return;

const send = (message) => sock.sendMessage(sender, { text: message });

switch (text.toLowerCase()) { // الأوامر العامة case ".حول": return send("أنا بوت جمايكا 💀\nالمطور: روني البحيره\nرقم المطور: 01222843252"); case ".الوقت": return send(⏰ الوقت الحالي: ${new Date().toLocaleTimeString()}); case ".التاريخ": return send(📅 التاريخ اليوم: ${new Date().toLocaleDateString()}); case ".اقتباس": return send("❝ لا تتوقف عندما تتعب، توقف عندما تنتهي. ❞"); case ".نكتة": return send("😂 واحد دخل جيم طلع عضلة الضحك بس!");

// أوامر الصور والفيديو (تجريبية)
case ".ميمز":
  return send("🖼 جاري إرسال ميمز ...");
case ".انمي":
  return send("🎌 انمي قادم ...");
case ".رومانسي":
  return send("💕 لحظة رومانسية ...");
case ".حزين":
  return send("😢 حزن ...");
case text.startsWith(".تنزيل") && text:
  return send("📥 جاري التحميل من الرابط ...");

// تفاعل وتسلية
case ".زواج":
  return send("💍 ألف مبروك الزواج الرقمي!");
case ".طلاق":
  return send("📄 الطلاق تم بنجاح!");
case ".موعد":
  return send("📆 موعدك محفوظ! جاهز؟");
case ".تجسس":
  return send("🕵️‍♂️ تم تفعيل وضع التجسس!");
case ".قلب":
  return send("❤️ من القلب للقلب رسائل جمايكا!");

// أوامر المطور
case ".حظر":
case ".فك_الحظر":
case ".اذاعة":
case ".إعادة_تشغيل":
case ".رفع_مشرف":
case ".تنزيل_مشرف":
  return send("🔐 هذه الأوامر للمطور فقط.");

// VIP
case ".اضافة_vip":
case ".حذف_vip":
case ".قائمة_vip":
case ".مساعدة_vip":
  return send("👑 أوامر VIP تحت التجربة.");

// الحماية والإدارة
case ".قفل_الجروب":
case ".منع_الروابط":
case ".انذار":
case ".طرد":
case ".كتم":
case ".فك_الكتم":
case ".قائمة_سوداء":
  return send("🛡️ أوامر الإدارة لم يتم تفعيلها بعد.");

// أخرى
case ".شكوى":
  return send("📬 أرسل شكواك هنا وسيتم مراجعتها.");
case ".عرض_الشكاوى":
case ".الدعم":
  return send("📞 الدعم مع روني البحيره: 01222843252");

// اختبار أساسي
case ".بوت":
  return send("✅ البوت شغال يا نجم!");

} };

