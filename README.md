# 🌀 SPIN Fans Product Chatbot

A lightweight, rule-based customer chatbot for [SPIN Fans](https://spinfans.com.sg/) — a Singaporean designer ceiling fan brand.

Customers can ask about products, collections, fan sizing, features, where to buy, and more — all without needing a backend or external AI service.

---

## Features

- **Product knowledge base** covering all SPIN Fans collections and models (Signature, Timber, Sphere, ONIX, Chromatic)
- **Smart intent matching** using keyword patterns
- **Fan sizing guide** — recommends the right fan size for your room
- **FAQ answers** — warranty, installation, LED lighting, outdoor use, and more
- **Two ready-to-use UIs**:
  - `chatbot/index.html` — standalone full-page chat interface
  - `chatbot/widget.js` — embeddable floating widget for any webpage
- **No backend required** — pure HTML/CSS/JavaScript, runs entirely in the browser

---

## Files

```
chatbot/
├── knowledge-base.js   # All product data (collections, models, FAQs, sizing guide)
├── chatbot-engine.js   # Intent matching logic and response generation
├── index.html          # Standalone full-page chatbot UI
├── embed-demo.html     # Demo page showing the floating widget
├── widget.js           # Embeddable floating chat widget
└── chatbot.test.js     # Unit tests (Node.js, no dependencies)
```

---

## Usage

### Option 1 – Standalone chat page

Open `chatbot/index.html` directly in a browser. No server required.

### Option 2 – Embed the widget in your website

Add the following before the closing `</body>` tag of your page:

```html
<!-- SPIN Fans Chatbot Widget -->
<script src="path/to/knowledge-base.js"></script>
<script src="path/to/chatbot-engine.js"></script>
<script src="path/to/widget.js"></script>
```

A floating 🌀 button will appear in the bottom-right corner. Click it to open the chat.

---

## Running Tests

```bash
npm test
```

Or directly:

```bash
node chatbot/chatbot.test.js
```

---

## Sample Questions

| Customer asks | Bot responds with |
|---|---|
| "What collections do you have?" | Lists all 5 collections |
| "Tell me about the Quincy" | Quincy model details, sizes, variants |
| "Which fan for my living room?" | Fan recommendation guide |
| "What size fan do I need?" | Room-size → fan-size guide |
| "Do SPIN fans have LED lighting?" | LED availability by collection |
| "How much does a fan cost?" | Price / where-to-buy info |
| "Where can I buy SPIN fans?" | Website, Shopee, showrooms |
| "Is it energy efficient?" | UDDC™ motor technology info |
| "Does it come with a warranty?" | Warranty answer |

---

## Extending the Chatbot

- **Add products**: edit `chatbot/knowledge-base.js`
- **Add intents / responses**: edit the `INTENTS` array and handlers in `chatbot-engine.js`
- **Style the UI**: edit the CSS in `index.html` or the inline styles in `widget.js`

For AI-powered responses (e.g. GPT), replace the `processMessage` function in `chatbot-engine.js` with a call to your preferred LLM API.
