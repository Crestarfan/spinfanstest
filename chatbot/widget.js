/**
 * SPIN Fans Chatbot Widget
 * Embeddable floating chat widget for spinfans.com.sg
 *
 * Usage:
 *   Include this script in your page (after knowledge-base.js and chatbot-engine.js):
 *     <script src="widget.js"></script>
 *
 *   The widget auto-initialises and shows a floating button in the bottom-right corner.
 */
(function (global) {
  "use strict";

  var WIDGET_ID = "spinfans-chat-widget";
  var LAUNCHER_ID = "spinfans-launcher";

  var styles = `
    #${LAUNCHER_ID} {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #e94560, #c73652);
      color: #fff;
      border: none;
      font-size: 26px;
      cursor: pointer;
      box-shadow: 0 4px 18px rgba(233,69,96,0.45);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #${LAUNCHER_ID}:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 24px rgba(233,69,96,0.55);
    }
    #${WIDGET_ID} {
      position: fixed;
      bottom: 94px;
      right: 24px;
      width: 380px;
      height: 560px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      z-index: 9998;
      display: none;
      flex-direction: column;
      background: #fff;
      animation: sfSlideUp 0.25s ease;
    }
    #${WIDGET_ID}.open {
      display: flex;
    }
    @keyframes sfSlideUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    #${WIDGET_ID} .sf-header {
      background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
      color: #fff;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    #${WIDGET_ID} .sf-header .sf-logo {
      width: 36px; height: 36px; border-radius: 50%;
      background: #e94560;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; flex-shrink: 0;
    }
    #${WIDGET_ID} .sf-header .sf-title { font-size: 14px; font-weight: 700; }
    #${WIDGET_ID} .sf-header .sf-sub   { font-size: 11px; color: #a8c5da; margin-top: 1px; }
    #${WIDGET_ID} .sf-close {
      margin-left: auto; background: transparent; border: none;
      color: #a8c5da; font-size: 20px; cursor: pointer; line-height: 1;
      padding: 2px 4px; border-radius: 4px;
    }
    #${WIDGET_ID} .sf-close:hover { color: #fff; }
    #${WIDGET_ID} .sf-messages {
      flex: 1; overflow-y: auto; padding: 14px 12px;
      display: flex; flex-direction: column; gap: 10px;
      scroll-behavior: smooth;
    }
    #${WIDGET_ID} .sf-messages::-webkit-scrollbar { width: 3px; }
    #${WIDGET_ID} .sf-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
    #${WIDGET_ID} .sf-msg {
      display: flex; gap: 6px;
      animation: sfFadeIn 0.2s ease;
    }
    @keyframes sfFadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    #${WIDGET_ID} .sf-msg.sf-user { flex-direction: row-reverse; }
    #${WIDGET_ID} .sf-msg .sf-avatar {
      width: 28px; height: 28px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; flex-shrink: 0; margin-top: 2px;
    }
    #${WIDGET_ID} .sf-msg.sf-bot  .sf-avatar { background: #e94560; color: #fff; }
    #${WIDGET_ID} .sf-msg.sf-user .sf-avatar { background: #0f3460; color: #fff; }
    #${WIDGET_ID} .sf-bubble {
      max-width: 82%; padding: 9px 12px; border-radius: 12px;
      font-size: 12.5px; line-height: 1.55; white-space: pre-wrap;
      word-break: break-word; font-family: inherit;
    }
    #${WIDGET_ID} .sf-msg.sf-bot  .sf-bubble {
      background: #f4f6f9; color: #1a1a2e; border-bottom-left-radius: 3px;
    }
    #${WIDGET_ID} .sf-msg.sf-user .sf-bubble {
      background: #0f3460; color: #fff; border-bottom-right-radius: 3px;
    }
    #${WIDGET_ID} .sf-suggestions {
      display: flex; flex-wrap: wrap; gap: 5px;
      padding: 4px 12px 8px; flex-shrink: 0;
    }
    #${WIDGET_ID} .sf-chip {
      background: #f0f2f5; border: 1px solid #dce0e8; color: #0f3460;
      border-radius: 16px; padding: 4px 10px; font-size: 11px;
      cursor: pointer; transition: background 0.15s; white-space: nowrap;
    }
    #${WIDGET_ID} .sf-chip:hover { background: #e0e7f5; }
    #${WIDGET_ID} .sf-input-row {
      display: flex; align-items: flex-end; gap: 6px;
      padding: 8px 12px 12px; border-top: 1px solid #edf0f4; flex-shrink: 0;
    }
    #${WIDGET_ID} .sf-input {
      flex: 1; resize: none; border: 1.5px solid #dce0e8; border-radius: 18px;
      padding: 8px 12px; font-size: 13px; font-family: inherit; outline: none;
      max-height: 80px; line-height: 1.4; color: #1a1a2e; transition: border-color 0.2s;
    }
    #${WIDGET_ID} .sf-input:focus { border-color: #0f3460; }
    #${WIDGET_ID} .sf-input::placeholder { color: #aab2bc; }
    #${WIDGET_ID} .sf-send {
      width: 36px; height: 36px; border-radius: 50%;
      background: #e94560; border: none; color: #fff;
      font-size: 16px; cursor: pointer; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, transform 0.1s;
    }
    #${WIDGET_ID} .sf-send:hover  { background: #c73652; }
    #${WIDGET_ID} .sf-send:active { transform: scale(0.92); }
    #${WIDGET_ID} .sf-footer {
      text-align: center; font-size: 10px; color: #aab2bc;
      padding: 4px; background: #fff; flex-shrink: 0;
    }
    #${WIDGET_ID} .sf-footer a { color: #0f3460; text-decoration: none; }
    .sf-typing .sf-bubble { display: flex; align-items: center; gap: 4px; padding: 10px 14px; }
    .sf-dot { width: 6px; height: 6px; border-radius: 50%; background: #9ca3af; animation: sfBounce 1.2s infinite; }
    .sf-dot:nth-child(2) { animation-delay: 0.2s; }
    .sf-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes sfBounce {
      0%, 80%, 100% { transform: translateY(0); }
      40%            { transform: translateY(-4px); }
    }
  `;

  function injectStyles() {
    var el = document.createElement("style");
    el.id = "spinfans-widget-styles";
    el.textContent = styles;
    document.head.appendChild(el);
  }

  function buildWidget() {
    // Launcher button
    var launcher = document.createElement("button");
    launcher.id = LAUNCHER_ID;
    launcher.setAttribute("aria-label", "Open SPIN Fans chat");
    launcher.setAttribute("title", "Chat with SPIN Fans");
    launcher.textContent = "🌀";

    // Widget panel
    var widget = document.createElement("div");
    widget.id = WIDGET_ID;
    widget.setAttribute("role", "dialog");
    widget.setAttribute("aria-label", "SPIN Fans product assistant");
    widget.innerHTML = `
      <div class="sf-header">
        <div class="sf-logo">🌀</div>
        <div>
          <div class="sf-title">SPIN Fans Assistant</div>
          <div class="sf-sub">Designer Ceiling Fans</div>
        </div>
        <button class="sf-close" aria-label="Close chat" title="Close">✕</button>
      </div>
      <div class="sf-messages" id="sf-messages" role="log" aria-live="polite"></div>
      <div class="sf-suggestions" id="sf-suggestions"></div>
      <div class="sf-input-row">
        <textarea class="sf-input" id="sf-input" placeholder="Ask about our fans…" rows="1" maxlength="500" aria-label="Type your message"></textarea>
        <button class="sf-send" id="sf-send" aria-label="Send" title="Send">➤</button>
      </div>
      <div class="sf-footer">
        <a href="https://spinfans.com.sg/" target="_blank" rel="noopener">spinfans.com.sg</a>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(widget);

    var bot          = global.SpinFansChatbot;
    var messagesEl   = document.getElementById("sf-messages");
    var inputEl      = document.getElementById("sf-input");
    var sendBtn      = document.getElementById("sf-send");
    var suggestEl    = document.getElementById("sf-suggestions");
    var closeBtn     = widget.querySelector(".sf-close");
    var isOpen       = false;

    function toggle() {
      isOpen = !isOpen;
      if (isOpen) {
        widget.classList.add("open");
        launcher.textContent = "✕";
        inputEl.focus();
      } else {
        widget.classList.remove("open");
        launcher.textContent = "🌀";
      }
    }

    launcher.addEventListener("click", toggle);
    closeBtn.addEventListener("click", toggle);

    function escapeHtml(str) {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function renderMarkdown(text) {
      return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    }

    function appendMsg(role, text) {
      var msg = document.createElement("div");
      msg.className = "sf-msg " + (role === "bot" ? "sf-bot" : "sf-user");
      var avatar = document.createElement("div");
      avatar.className = "sf-avatar";
      avatar.textContent = role === "bot" ? "🌀" : "👤";
      var bubble = document.createElement("div");
      bubble.className = "sf-bubble";
      bubble.innerHTML = renderMarkdown(text);
      msg.appendChild(avatar);
      msg.appendChild(bubble);
      messagesEl.appendChild(msg);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTyping() {
      var msg = document.createElement("div");
      msg.className = "sf-msg sf-bot sf-typing";
      msg.id = "sf-typing";
      msg.innerHTML = '<div class="sf-avatar">🌀</div><div class="sf-bubble"><span class="sf-dot"></span><span class="sf-dot"></span><span class="sf-dot"></span></div>';
      messagesEl.appendChild(msg);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function hideTyping() {
      var el = document.getElementById("sf-typing");
      if (el) el.remove();
    }

    function renderSuggestions(chips) {
      suggestEl.innerHTML = "";
      chips.forEach(function (text) {
        var btn = document.createElement("button");
        btn.className = "sf-chip";
        btn.textContent = text;
        btn.addEventListener("click", function () { sendMessage(text); });
        suggestEl.appendChild(btn);
      });
    }

    function sendMessage(text) {
      text = (text || inputEl.value).trim();
      if (!text) return;
      inputEl.value = "";
      autoResize();
      suggestEl.innerHTML = "";
      appendMsg("user", text);
      showTyping();
      setTimeout(function () {
        hideTyping();
        appendMsg("bot", bot.processMessage(text));
        renderSuggestions(bot.getSuggestedQuestions());
      }, 600);
    }

    function autoResize() {
      inputEl.style.height = "auto";
      inputEl.style.height = Math.min(inputEl.scrollHeight, 80) + "px";
    }

    inputEl.addEventListener("input", autoResize);
    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
    sendBtn.addEventListener("click", function () { sendMessage(); });

    // Init welcome
    appendMsg("bot", bot.getWelcomeMessage());
    renderSuggestions(bot.getSuggestedQuestions());
  }

  function init() {
    if (document.getElementById(WIDGET_ID)) return; // already initialised
    injectStyles();
    buildWidget();
  }

  global.SpinFansWidget = { init: init };

  // Auto-initialise when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { init(); });
  } else {
    init();
  }
})(window);
