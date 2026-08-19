// Unit tests for the SpinFans chatbot engine

const KB = require("./knowledge-base");
const bot = require("./chatbot-engine");

let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) {
    console.log("  ✅ PASS:", description);
    passed++;
  } else {
    console.error("  ❌ FAIL:", description);
    failed++;
  }
}

function assertContains(description, text, substring) {
  assert(description, typeof text === "string" && text.toLowerCase().includes(substring.toLowerCase()));
}

console.log("\n🌀 SpinFans Chatbot Engine Tests\n");

// ── Knowledge Base ────────────────────────────────────────────────────────────

console.log("Knowledge Base:");
assert("KB exports an object", typeof KB === "object");
assert("KB has brand info", typeof KB.brand === "object");
assert("KB has collections", typeof KB.collections === "object");
assert("KB has models", typeof KB.models === "object");
assert("KB has sizing guide", Array.isArray(KB.sizing.guide));
assert("KB has technology info", typeof KB.technology === "object");
assert("KB has FAQ array", Array.isArray(KB.faq) && KB.faq.length > 0);
assert("KB brand name is SPIN Fans", KB.brand.name === "SPIN Fans");
assert("KB has 5 collections", Object.keys(KB.collections).length === 5);
assert("KB has 6 models", Object.keys(KB.models).length === 6);

// ── Bot API ────────────────────────────────────────────────────────────────────

console.log("\nBot API:");
assert("processMessage function exists", typeof bot.processMessage === "function");
assert("getWelcomeMessage function exists", typeof bot.getWelcomeMessage === "function");
assert("getSuggestedQuestions function exists", typeof bot.getSuggestedQuestions === "function");
assert("getSuggestedQuestions returns array", Array.isArray(bot.getSuggestedQuestions()));
assert("getSuggestedQuestions returns ≥1 items", bot.getSuggestedQuestions().length >= 1);

// ── Welcome Message ───────────────────────────────────────────────────────────

console.log("\nWelcome Message:");
var welcome = bot.getWelcomeMessage();
assert("Welcome message is a string", typeof welcome === "string");
assertContains("Welcome message mentions SPIN Fans", welcome, "spin");
assertContains("Welcome message mentions collections", welcome, "collection");

// ── Intents ───────────────────────────────────────────────────────────────────

console.log("\nGreeting intent:");
assertContains("'hi' triggers greeting", bot.processMessage("hi"), "welcome");
assertContains("'hello' triggers greeting", bot.processMessage("hello"), "spin");
assertContains("'hey' triggers greeting", bot.processMessage("hey"), "spin");

console.log("\nFarewell intent:");
assertContains("'bye' triggers farewell", bot.processMessage("bye"), "thank you");
assertContains("'thank you' triggers farewell", bot.processMessage("thank you"), "spinfans");

console.log("\nAbout intent:");
assertContains("'about spin' triggers about", bot.processMessage("tell me about SPIN"), "singapore");
assertContains("'what is spin' triggers about", bot.processMessage("what is spin"), "ceiling fan");

console.log("\nCollections intent:");
assertContains("'collection' triggers collections list", bot.processMessage("what collections do you have?"), "signature");
assertContains("Collections response includes Timber", bot.processMessage("show me your collections"), "timber");

console.log("\nSignature collection:");
assertContains("'signature' triggers Signature collection", bot.processMessage("tell me about Signature"), "signature collection");
assertContains("Signature response includes UDDC", bot.processMessage("signature fans"), "uddc");

console.log("\nTimber collection:");
assertContains("'timber' triggers Timber collection", bot.processMessage("timber fans"), "timber");
assertContains("'wood' triggers Timber collection", bot.processMessage("wood blades"), "timber");

console.log("\nSphere collection:");
assertContains("'corner fan' triggers Sphere", bot.processMessage("corner fan"), "sphere");
assertContains("'sphere' triggers Sphere collection", bot.processMessage("sphere collection"), "corner");

console.log("\nONIX collection:");
assertContains("'onix' triggers ONIX collection", bot.processMessage("onix fans"), "hvls");
assertContains("'commercial' triggers ONIX", bot.processMessage("commercial fan"), "onix");

console.log("\nModel – Quincy:");
assertContains("'quincy' triggers Quincy model info", bot.processMessage("quincy"), "quincy");
assertContains("Quincy response includes sizes", bot.processMessage("tell me about quincy"), '43"');

console.log("\nModel – Espada:");
assertContains("'espada' triggers Espada model info", bot.processMessage("espada"), "espada");

console.log("\nModel – Savannah:");
assertContains("'savannah' triggers Savannah model", bot.processMessage("savannah"), "savannah");

console.log("\nModel – Caramel:");
assertContains("'caramel' triggers Caramel model", bot.processMessage("caramel fan"), "caramel");

console.log("\nSizing intent:");
assertContains("'size' triggers sizing guide", bot.processMessage("what size fan do I need"), "sq ft");
assertContains("'room' triggers sizing guide", bot.processMessage("which fan for my room"), "sq ft");
assertContains("Sizing guide has 36 inch option", bot.processMessage("sizing guide"), '36"');

console.log("\nTechnology intent:");
assertContains("'uddc' triggers technology", bot.processMessage("uddc motor"), "uddc");
assertContains("'quiet' triggers technology", bot.processMessage("is it quiet"), "uddc");
assertContains("'energy' triggers technology", bot.processMessage("energy efficient fan"), "dc");

console.log("\nLED intent:");
assertContains("'led' triggers LED response", bot.processMessage("led light"), "led");
assertContains("'lighting' triggers LED response", bot.processMessage("do they have lighting"), "led");

console.log("\nWarranty intent:");
assertContains("'warranty' triggers warranty info", bot.processMessage("warranty"), "warranty");

console.log("\nInstallation intent:");
assertContains("'install' triggers installation info", bot.processMessage("how do I install"), "install");
assertContains("'ceiling' triggers installation info", bot.processMessage("false ceiling"), "ceiling");

console.log("\nOutdoor intent:");
assertContains("'outdoor' triggers outdoor info", bot.processMessage("outdoor use"), "indoor");
assertContains("'balcony' triggers outdoor info", bot.processMessage("balcony fan"), "outdoor");

console.log("\nControl intent:");
assertContains("'remote' triggers control info", bot.processMessage("remote control"), "remote");

console.log("\nPricing intent:");
assertContains("'price' triggers pricing info", bot.processMessage("how much does it cost"), "price");
assertContains("'how much' triggers pricing", bot.processMessage("how much does a fan cost"), "spinfans.com.sg");

console.log("\nWhere to buy intent:");
assertContains("'where to buy' triggers buy info", bot.processMessage("where can I buy"), "shopee");
assertContains("'showroom' triggers buy info", bot.processMessage("showroom location"), "tampines");

console.log("\nSafety intent:");
assertContains("'safety' triggers safety info", bot.processMessage("is it safety certified"), "safety mark");

console.log("\nRecommend intent:");
assertContains("'recommend' triggers recommendation", bot.processMessage("recommend a fan for my living room"), "living room");
assertContains("'which fan' triggers recommendation", bot.processMessage("which fan should I get"), "quincy");

console.log("\nContact intent:");
assertContains("'contact' triggers contact info", bot.processMessage("how to contact SPIN"), "contact");

console.log("\nHelp intent:");
assertContains("'help' triggers help menu", bot.processMessage("help"), "collection");
assertContains("'menu' triggers help menu", bot.processMessage("show me the menu"), "sizing");

console.log("\nFallback:");
assertContains("Unknown message returns fallback", bot.processMessage("xyzfoobarqux123"), "not sure");
assertContains("Empty string returns fallback", bot.processMessage(""), "not sure");
assert("null input returns string", typeof bot.processMessage(null) === "string");

// ── Results ───────────────────────────────────────────────────────────────────

console.log(`\n─────────────────────────────`);
console.log(`Total: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
if (failed > 0) {
  console.error(`\n${failed} test(s) failed.`);
  process.exit(1);
} else {
  console.log("\n🎉 All tests passed!");
}
