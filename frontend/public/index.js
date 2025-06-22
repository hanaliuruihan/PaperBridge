document.getElementById("docForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = document.getElementById("docText").value;

  const response = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: text // or messages if you're passing system + user roles
    })
  });

  const data = await response.json();
  document.getElementById("result").innerText = JSON.stringify(data, null, 2);

});

document.getElementById('language-select').addEventListener('change', function () {
  const lang = this.value;

  const uiText = {
    en: {
      placeholder: "Type a message...",
      sendButton: "Send",
      title: "PaperBridge"
    },
    es: {
      placeholder: "Escribe un mensaje...",
      sendButton: "Enviar",
      title: "PaperPuente"
    },
    fr: {
      placeholder: "Tapez un message...",
      sendButton: "Envoyer",
      title: "PontPapier"
    }
  };

  const selected = uiText[lang];
  document.getElementById('chat-input').placeholder = selected.placeholder;
  document.querySelector('#chat-form button').textContent = selected.sendButton;
  document.querySelector('.title').textContent = selected.title;
});
