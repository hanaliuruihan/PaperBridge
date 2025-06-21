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
