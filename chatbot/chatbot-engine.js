// SpinFans Chatbot Engine
// Rule-based intent matching with keyword detection

(function (global) {
  "use strict";

  var KB = typeof require !== "undefined" ? require("./knowledge-base") : global.SPINFANS_KB;

  // ─── Intent definitions ────────────────────────────────────────────────────

  var INTENTS = [
    // Greetings
    {
      name: "greeting",
      patterns: [/\b(hi|hello|hey|good morning|good afternoon|good evening|howdy)\b/i],
      handler: handleGreeting,
    },
    // Farewells
    {
      name: "farewell",
      patterns: [/\b(bye|goodbye|see you|thanks|thank you|cheers|ok done|done)\b/i],
      handler: handleFarewell,
    },
    // Brand / About
    {
      name: "about",
      patterns: [/\b(what is spin|about spin|who is spin|about the brand|brand|company)\b/i],
      handler: handleAbout,
    },
    // Collections list
    {
      name: "collections",
      patterns: [/\b(collections?|range|series|lineup|product line)\b/i],
      handler: handleCollections,
    },
    // Signature
    {
      name: "signature",
      patterns: [/\bsignature\b/i],
      handler: () => handleCollection("signature"),
    },
    // Timber
    {
      name: "timber",
      patterns: [/\b(timber|wood|wooden)\b/i],
      handler: () => handleCollection("timber"),
    },
    // Sphere / corner
    {
      name: "sphere",
      patterns: [/\b(sphere|corner fan|corner)\b/i],
      handler: () => handleCollection("sphere"),
    },
    // ONIX
    {
      name: "onix",
      patterns: [/\b(onix|hvls|commercial|large space|industrial)\b/i],
      handler: () => handleCollection("onix"),
    },
    // Chromatic
    {
      name: "chromatic",
      patterns: [/\b(chromatic|colour|color|eco|sustainable)\b/i],
      handler: () => handleCollection("chromatic"),
    },
    // Specific models
    {
      name: "model_quincy",
      patterns: [/\bquincy\b/i],
      handler: () => handleModel("quincy"),
    },
    {
      name: "model_espada",
      patterns: [/\bespada\b/i],
      handler: () => handleModel("espada"),
    },
    {
      name: "model_savannah",
      patterns: [/\bsavannah\b/i],
      handler: () => handleModel("savannah"),
    },
    {
      name: "model_caramel",
      patterns: [/\bcaramel\b/i],
      handler: () => handleModel("caramel"),
    },
    {
      name: "model_sphere",
      patterns: [/\bsphere\b/i],
      handler: () => handleModel("sphere"),
    },
    // Sizing / room size
    {
      name: "sizing",
      patterns: [/\b(size|sizing|big|small|room|sq ft|square feet|which size|what size)\b/i],
      handler: handleSizing,
    },
    // Technology / motor
    {
      name: "technology",
      patterns: [/\b(technology|motor|uddc|dc motor|quiet|noise|efficient|energy|hvls|natural wind)\b/i],
      handler: handleTechnology,
    },
    // LED / lighting
    {
      name: "led",
      patterns: [/\b(led|light|lighting)\b/i],
      handler: handleLED,
    },
    // Warranty
    {
      name: "warranty",
      patterns: [/\b(warranty|guarantee)\b/i],
      handler: handleWarranty,
    },
    // Installation
    {
      name: "installation",
      patterns: [/\b(install|installation|ceiling|false ceiling|rod|height)\b/i],
      handler: handleInstallation,
    },
    // Outdoor
    {
      name: "outdoor",
      patterns: [/\b(outdoor|outside|balcony|alfresco|exterior)\b/i],
      handler: handleOutdoor,
    },
    // Control / remote
    {
      name: "control",
      patterns: [/\b(control|remote|switch|smart home|wifi|app)\b/i],
      handler: handleControl,
    },
    // Price / cost
    {
      name: "price",
      patterns: [/\b(price|cost|how much|cheap|expensive|budget|affordable)\b/i],
      handler: handlePrice,
    },
    // Where to buy
    {
      name: "buy",
      patterns: [/\b(buy|purchase|shop|store|shopee|showroom|dealer|where)\b/i],
      handler: handleWhereToBuy,
    },
    // Safety mark
    {
      name: "safety",
      patterns: [/\b(safety|safe|certified|certification|singapore standard)\b/i],
      handler: handleSafety,
    },
    // Recommendation
    {
      name: "recommend",
      patterns: [/\b(recommend|suggest|which fan|best fan|suitable|best for)\b/i],
      handler: handleRecommend,
    },
    // Contact
    {
      name: "contact",
      patterns: [/\b(contact|reach|email|phone|call|enquire)\b/i],
      handler: handleContact,
    },
    // Help menu
    {
      name: "help",
      patterns: [/\b(help|menu|what can you|options|list)\b/i],
      handler: handleHelp,
    },
  ];

  // ─── Handlers ──────────────────────────────────────────────────────────────

  function handleGreeting() {
    return (
      "👋 Hi there! Welcome to SPIN Fans. I'm here to help you find the perfect designer ceiling fan.\n\n" +
      "You can ask me about:\n" +
      "• Our fan collections (Signature, Timber, Sphere, ONIX)\n" +
      "• Specific models (Quincy, Espada, Savannah, Caramel, ONIX)\n" +
      "• Fan sizing guide\n" +
      "• Technology & features\n" +
      "• Where to buy\n\n" +
      "What would you like to know? 😊"
    );
  }

  function handleFarewell() {
    return "Thank you for chatting with us! Visit spinfans.com.sg to explore our full range. Have a great day! 🌬️";
  }

  function handleAbout() {
    var b = KB.brand;
    return (
      "🌀 **" + b.name + "** — " + b.tagline + "\n\n" +
      b.description + "\n\n" +
      "🌐 Website: " + b.website + "\n" +
      "📍 Showrooms: " + b.showrooms.map(function (s) { return s.name + " (" + s.area + ")"; }).join(", ")
    );
  }

  function handleCollections() {
    var lines = ["Here are all the SPIN Fans collections:\n"];
    Object.keys(KB.collections).forEach(function (key) {
      var c = KB.collections[key];
      lines.push("🌀 **" + c.name + "**\n   " + c.description);
    });
    lines.push("\nAsk me about any specific collection or model for more details!");
    return lines.join("\n\n");
  }

  function handleCollection(key) {
    var c = KB.collections[key];
    if (!c) return fallback();
    var parts = ["**" + c.name + "**\n" + c.description];
    if (c.models && c.models.length) {
      parts.push("📦 Models: " + c.models.join(", "));
    }
    if (c.sizes && c.sizes.length) {
      parts.push("📐 Available sizes: " + c.sizes.join(", "));
    }
    if (c.colours && c.colours.length) {
      parts.push("🎨 Colours: " + c.colours.join(", "));
    }
    if (c.features && c.features.length) {
      parts.push("✨ Key features:\n" + c.features.map(function (f) { return "  • " + f; }).join("\n"));
    }
    return parts.join("\n\n");
  }

  function handleModel(key) {
    var m = KB.models[key];
    if (!m) return fallback();
    var parts = ["**" + m.name + "**\n" + m.description];
    parts.push("📏 Sizes: " + m.sizes.join(", "));
    if (m.variants && m.variants.length) {
      parts.push("🎨 Variants: " + m.variants.join(", "));
    }
    if (m.blades) {
      parts.push("🔢 Blades: " + m.blades);
    }
    parts.push("🏠 Best for: " + m.bestFor);
    parts.push("📚 Collections: " + m.collections.join(", "));
    return parts.join("\n\n");
  }

  function handleSizing() {
    var guide = KB.sizing.guide;
    var lines = ["**Fan Sizing Guide**\n\nChoosing the right fan size is important for efficient cooling:\n"];
    guide.forEach(function (g) {
      lines.push("📐 " + g.roomSize + "\n   → Recommended: **" + g.recommended + "**");
    });
    lines.push("\n💡 Tip: " + KB.sizing.tip);
    return lines.join("\n\n");
  }

  function handleTechnology() {
    var tech = KB.technology;
    var parts = ["**SPIN Fans Technology**\n"];
    Object.keys(tech).forEach(function (key) {
      var t = tech[key];
      parts.push("⚙️ **" + t.name + "**\n" + t.description);
    });
    return parts.join("\n\n");
  }

  function handleLED() {
    return (
      "💡 **LED Lighting**\n\n" +
      "Selected SPIN fan models support optional integrated LED lighting kits:\n" +
      "• **Signature Collection** — LED lighting option available on select models\n" +
      "• **ONIX Collection** — LED lighting option available\n\n" +
      "Check the specific product page on spinfans.com.sg for the latest LED add-on availability and pricing."
    );
  }

  function handleWarranty() {
    return (
      "🛡️ **Warranty**\n\n" +
      KB.faq.find(function (f) { return f.q.toLowerCase().includes("warranty"); }).a + "\n\n" +
      "For detailed warranty terms, please visit: https://spinfans.com.sg/ or contact the SPIN team."
    );
  }

  function handleInstallation() {
    return (
      "🔧 **Installation**\n\n" +
      KB.faq.find(function (f) { return f.q.toLowerCase().includes("install"); }).a + "\n\n" +
      "📏 Height tip: " + KB.sizing.tip
    );
  }

  function handleOutdoor() {
    return (
      "🌤️ **Outdoor Use**\n\n" +
      KB.faq.find(function (f) { return f.q.toLowerCase().includes("outdoor"); }).a
    );
  }

  function handleControl() {
    return (
      "🎮 **Fan Control**\n\n" +
      KB.faq.find(function (f) { return f.q.toLowerCase().includes("control"); }).a
    );
  }

  function handlePrice() {
    return (
      "💰 **Pricing**\n\n" +
      "For the latest pricing and promotions, please visit:\n" +
      "🌐 " + KB.brand.website + "\n\n" +
      "You can also find competitive prices on:\n" +
      KB.brand.whereToFind.map(function (w) { return "  • " + w; }).join("\n")
    );
  }

  function handleWhereToBuy() {
    return (
      "🛒 **Where to Buy SPIN Fans**\n\n" +
      "You can find SPIN Fans at:\n" +
      KB.brand.whereToFind.map(function (w) { return "  • " + w; }).join("\n") + "\n\n" +
      "📍 Showrooms:\n" +
      KB.brand.showrooms.map(function (s) { return "  • " + s.name + " — " + s.area; }).join("\n")
    );
  }

  function handleSafety() {
    var s = KB.technology.safetyMark;
    return "✅ **" + s.name + "**\n\n" + s.description;
  }

  function handleRecommend() {
    return (
      "🌀 **Fan Recommendations**\n\n" +
      "Here's a quick guide to find your perfect SPIN fan:\n\n" +
      "🏠 **Small bedroom / study** → Sphere Corner Fan (16\") or Quincy 36\"\n" +
      "🛏️ **Standard bedroom** → Quincy or Espada (43\")\n" +
      "🛋️ **Living room / master bedroom** → Quincy, Espada, Savannah, or Caramel (52\")\n" +
      "🏡 **Open-plan living/dining** → Any 60\" model or ONIX (60\"–84\")\n" +
      "🏢 **Commercial / large spaces** → ONIX Pro (60\"–84\")\n" +
      "🌿 **Natural / Scandinavian look** → Timber Collection (Quincy/Espada)\n" +
      "🎨 **Bold minimalist** → Espada (Black) or Chromatic Collection\n\n" +
      "Would you like more details on any of these? 😊"
    );
  }

  function handleContact() {
    return (
      "📞 **Contact SPIN Fans**\n\n" +
      "Visit our contact page: " + KB.brand.contact + "\n\n" +
      "📍 Showrooms:\n" +
      KB.brand.showrooms.map(function (s) { return "  • " + s.name + " — " + s.area; }).join("\n") + "\n\n" +
      "Our team will be happy to help with product enquiries, installation advice, and more!"
    );
  }

  function handleHelp() {
    return (
      "🤖 **What I can help you with:**\n\n" +
      "• 🌀 **Collections** — Signature, Timber, Sphere, ONIX, Chromatic\n" +
      "• 📦 **Models** — Quincy, Espada, Savannah, Caramel, ONIX\n" +
      "• 📐 **Sizing guide** — which fan size for your room\n" +
      "• ⚙️ **Technology** — UDDC™ motor, HVLS, Natural Wind mode\n" +
      "• 💡 **LED lighting** — which fans have LED options\n" +
      "• 🛒 **Where to buy** — online and showroom locations\n" +
      "• 🔧 **Installation** — ceiling height, rod, requirements\n" +
      "• 🛡️ **Warranty** — warranty information\n" +
      "• 💰 **Pricing** — where to find current prices\n" +
      "• 📞 **Contact** — how to reach the SPIN team\n\n" +
      "Just type your question and I'll do my best to help! 😊"
    );
  }

  function fallback() {
    return (
      "I'm not sure I understood that. Here are some things you can ask me:\n\n" +
      "• Tell me about the Quincy fan\n" +
      "• What sizes are available?\n" +
      "• Which fan is best for my living room?\n" +
      "• Where can I buy SPIN fans?\n" +
      "• Do SPIN fans come with LED lighting?\n\n" +
      "Type **help** for a full list of topics."
    );
  }

  // ─── Main process function ─────────────────────────────────────────────────

  function processMessage(input) {
    if (!input || typeof input !== "string") return fallback();

    var text = input.trim();
    if (text.length === 0) return fallback();

    // Check each intent in order (first match wins)
    for (var i = 0; i < INTENTS.length; i++) {
      var intent = INTENTS[i];
      for (var j = 0; j < intent.patterns.length; j++) {
        if (intent.patterns[j].test(text)) {
          return intent.handler();
        }
      }
    }

    // Check FAQ for direct keyword matches
    var lower = text.toLowerCase();
    for (var k = 0; k < KB.faq.length; k++) {
      var faqItem = KB.faq[k];
      var keyWords = faqItem.q.toLowerCase().split(/\W+/).filter(function (w) { return w.length > 3; });
      var matches = keyWords.filter(function (w) { return lower.indexOf(w) !== -1; });
      if (matches.length >= 2) {
        return "❓ **" + faqItem.q + "**\n\n" + faqItem.a;
      }
    }

    return fallback();
  }

  // ─── Export ────────────────────────────────────────────────────────────────

  var ChatbotEngine = {
    processMessage: processMessage,
    getWelcomeMessage: handleGreeting,
    getSuggestedQuestions: function () {
      return [
        "What collections do you have?",
        "Tell me about the Quincy fan",
        "Which fan size do I need?",
        "Do SPIN fans have LED lighting?",
        "Where can I buy SPIN fans?",
        "Recommend a fan for my living room",
      ];
    },
  };

  if (typeof module !== "undefined") {
    module.exports = ChatbotEngine;
  } else {
    global.SpinFansChatbot = ChatbotEngine;
  }
})(typeof window !== "undefined" ? window : global);
