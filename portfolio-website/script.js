document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("themeToggle");
  const body = document.body;
  const magicBtn = document.getElementById("magicBtn");
  const chatToggle = document.getElementById("chatToggle");
  const chatWindow = document.getElementById("chatWindow");
  const chatInput = document.getElementById("chatInput");
  const chatLog = document.getElementById("chatLog");

  // Load stored theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
  }

  // Theme toggle
  themeBtn?.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    const current = body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", current);
  });

  // Click counter logic
  let clicks = localStorage.getItem("clicks") || 0;
  if (magicBtn) {
    magicBtn.innerText = `Clicked ${clicks} times`;
    magicBtn.addEventListener("click", () => {
      clicks++;
      localStorage.setItem("clicks", clicks);
      magicBtn.innerText = `Clicked ${clicks} times`;
      magicBtn.style.transform = "scale(0.95)";
      setTimeout(() => {
        magicBtn.style.transform = "scale(1)";
      }, 150);
    });
  }

  

  // Toggle chat window
  chatToggle?.addEventListener("click", () => {
    chatWindow.style.display = chatWindow.style.display === "block" ? "none" : "block";
  });

  // Chat response logic
  const getResponse = (msg) => {
    const text = msg.toLowerCase();

    // Identity
    if (text.includes("who is tony") || text.includes("nani ni tony")) {
      return text.includes("nani")
        ? "Tony ni mwanafunzi wa Teknolojia ya Habari kutoka Chuo Kikuu cha Karatina. 💻 Anapenda usanifu wa tovuti, usalama wa mtandao, na programu kwa HTML, CSS, JavaScript, Python, C, na C++. Anaweza hata kutengeneza chatbot kama mimi! 😄"
        : "Tony is an Information Technology student at Karatina University 💻 who enjoys web development, cybersecurity, and programming in HTML, CSS, JavaScript, Python, C, and C++. He even built this chatbot 😄";
    }

    // Swahili
    if (text.includes("habari") || text.includes("hujambo")) {
      return "Habari! 👋 Mimi ni msaidizi wa Tony.";
    }
    if (text.includes("mradi") || text.includes("miradi")) {
      return "Unaweza kuona miradi ya Tony katika sehemu ya Miradi hapa juu 🔧";
    }
    if (text.includes("wasifu") || text.includes("cv")) {
      return `<a href="Tony-CV.pdf" target="_blank">Bofya hapa kupakua wasifu wa Tony 📄</a>`;
    }
    if (text.includes("wasiliana") || text.includes("barua")) {
      return "Unaweza kumpata Tony kwa baruapepe: <a href='mailto:muriutony2@gmail.com'>muriutony2@gmail.com</a>";
    }

    // English
    if (text.includes("hi") || text.includes("hello")) {
      return "Hey there! 👋 I'm Tony's virtual assistant.";
    }
    if (text.includes("project")) {
      return "Check out the Projects section above to see Tony’s work!";
    }
    if (text.includes("cv") || text.includes("resume")) {
      return `<a href="Tony-CV.pdf" target="_blank">Click here to download Tony's CV 📎</a>`;
    }
    if (text.includes("contact") || text.includes("email")) {
      return "You can reach Tony at <a href='mailto:muriutony2@gmail.com'>muriutony2@gmail.com</a> 📬";
    }

    return "Hmm... 🤔 I didn’t understand that. Try greeting me or asking about Tony!";
  };

  // Chat input listener
  chatInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const userMsg = chatInput.value.trim();
      if (!userMsg) return;

      const userLine = `<p><strong>You:</strong> ${userMsg}</p>`;
      const botLine = `<p><strong>Bot:</strong> ${getResponse(userMsg)}</p>`;

      chatLog.innerHTML += userLine + botLine;
      chatInput.value = "";
      chatLog.scrollTop = chatLog.scrollHeight;

      const updated = [...chatLog.querySelectorAll("p")].map(p => p.outerHTML);
      localStorage.setItem("chatHistory", JSON.stringify(updated));
    }
  });
});

