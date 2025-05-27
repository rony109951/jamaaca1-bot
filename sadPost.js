const sadPosts = [
  "أحياناً، الحزن لا يُحكى بالكلمات.",
  "أبكي بصمت كي لا يشعر بي أحد.",
  "ما أصعب أن تبكي بلا دموع... وما أصعب أن تذهب بلا رجوع.",
  "الوجع هو أن أشتاق لك وأنت لا تدري.",
  "أخفيت حزني عن الجميع حتى ظنوا أني سعيد.",
  "كل شيء قابل للنسيان إلا من جعلنا نبكي.",
  "أقسى أنواع الألم هو التظاهر بالقوة بينما داخلك يتفتت.",
  "القلوب التي تعبت من الصبر لا تنسى بسهولة.",
  "لا أحد يشعر بما أشعر به، حتى حين أبتسم.",
  "سئمت التظاهر بأنني بخير."
];

module.exports = {
  name: "حزين",
  alias: ["sadpost", "بوست_حزين", "حزن"],
  description: "يرسل بوست حزين عشوائي.",
  category: "رومانسيات",
  async execute(message, args, client) {
    const randomPost = sadPosts[Math.floor(Math.random() * sadPosts.length)];

    await client.sendMessage(message.chat, {
      text: `💔 ${randomPost}`,
    }, { quoted: message });
  }
};