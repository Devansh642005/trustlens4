const bubble = document.getElementById("ai-bubble");

function toggleAssistant() {
  bubble.classList.toggle("hidden");
}

function analyze() {
  const text = document.getElementById("inputText").value.trim();

  if (!text) {
    bubble.innerHTML = "⚠️ Paste some text first!";
    bubble.classList.remove("hidden");
    return;
  }

  bubble.innerHTML = "🔍 Scanning message...";
  bubble.classList.remove("hidden");

  fetch("/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").classList.remove("hidden");

    const statusEl = document.getElementById("status");
    statusEl.innerText = data.status;
    statusEl.className = data.status;

    document.getElementById("score").innerText = data.score;

    const ul = document.getElementById("reasons");
    ul.innerHTML = "";

    if (data.reasons.length === 0) {
      ul.innerHTML = "<li>No obvious threats detected.</li>";
    } else {
      data.reasons.forEach(r => {
        const li = document.createElement("li");
        li.innerText = r;
        ul.appendChild(li);
      });
    }

    bubble.innerHTML = "🧠 Result: <b>" + data.status + "</b>";
  })
    bubble.innerHTML = "❌ Error analyzing content";
    console.error(err);
  };
  
