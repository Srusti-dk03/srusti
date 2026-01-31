async function askAI() {
  const topic = document.getElementById("topic").value;
  const output = document.getElementById("output");

  if (!topic) {
    output.innerText = "⚠️ Please enter a topic";
    return;
  }

  output.innerText = "⏳ Thinking...";

  try {
    const res = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic })
    });

    const data = await res.json();
    output.innerText = data.reply;

  } catch (error) {
    output.innerText = "❌ Error connecting to server";
  }
}
