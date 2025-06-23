let messageHistory = [
  {
    role: "system",
    content: "You are a helpful assistant. Please remember the conversation history and respond accordingly."
  }
];

window.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatHistory = document.getElementById('chat-history');
  const languageSelect = document.getElementById('language-select');

  const translations = {
    en: {
      placeholder: "Type a message...",
      send: "Send",
      title: "PaperBridge",
      languageLabel: "Language:",
      chatLabel: "Previous Chats:"
    },
    es: {
      placeholder: "Escribe un mensaje...",
      send: "Enviar",
      title: "PaperPuente",
      languageLabel: "Idioma:",
      chatLabel: "Chats anteriores:"
    },
    fr: {
      placeholder: "Tapez un message...",
      send: "Envoyer",
      title: "PontPapier",
      languageLabel: "Langue:",
      chatLabel: "Discussions précédentes:"
    },
    cn: {
      placeholder: "请输入你的需求...",
      send: "发送",
      title: "纸桥",
      languageLabel: "语言:",
      chatLabel: "聊天历史:"
    }
  };

  languageSelect.addEventListener('change', function () {
    const lang = this.value;
    const ui = translations[lang] || translations.en;

    chatInput.placeholder = ui.placeholder;
    document.querySelector('#chat-form button').textContent = ui.send;
    document.querySelector('.title').textContent = ui.title;
    document.querySelector('label[for="language-select"]').textContent = ui.languageLabel;
    document.querySelector('label[for="chat-select"]').textContent = ui.chatLabel;
  });

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    const language = languageSelect.value;

    if (message === "") return;

    // Add user message to chat
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.textContent = "User: " + message;
    chatHistory.appendChild(userMsg);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    chatInput.value = "";

    
   try {
      messageHistory.push({ role: "user", content: message });

      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messageHistory, language }),
      });

      const data = await response.json();
      const reply = data?.completion_message?.content?.text || "AI did not respond.";

      const aiMsg = document.createElement('div');
      aiMsg.className = 'message ai-message';
      aiMsg.textContent = "AI: " + reply;
      chatHistory.appendChild(aiMsg);
      chatHistory.scrollTop = chatHistory.scrollHeight;

    } catch (err) {
      const errorMsg = document.createElement('div');
      errorMsg.className = 'message ai-message';
      errorMsg.textContent = "Error talking to LLaMA: " + err.message;
      chatHistory.appendChild(errorMsg);
    }
  });
});
