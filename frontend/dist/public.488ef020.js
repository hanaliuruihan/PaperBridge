document.getElementById("docForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const text = document.getElementById("docText").value;
    const formData = new FormData();
    formData.append("text", text);
    const response = await fetch("http://localhost:8000/explain-doc/", {
        method: "POST",
        body: formData
    });
    const data = await response.json();
    document.getElementById("result").innerText = JSON.stringify(data, null, 2);
});

//# sourceMappingURL=public.488ef020.js.map
