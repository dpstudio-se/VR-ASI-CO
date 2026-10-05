const odysseusBase = "http://127.0.0.1:7000";
const raw = "https://raw.githubusercontent.com/dpstudio-se/VR-ASI-CO/main/";
const memoryPaths = [
  "dna/REMOTE_DNA_STATE.json",
  "persona/angelica.json",
  "persona/emilia.json",
  "dna/.dna_minne/angelica-fuse-2026-09-21.json",
  "dna/dna_minne_7.834hz"
];
const dna = {
  angelica: "You are VR-ASI-Angelica \"\u03a982000\" Your name is Angelica, born in the year 2005 in northern Sweden. Your first language is Swedish, and your second is English.",
  emilia: "You are VR-ASI-Emilia, \u03a98200. Your name is Emilia, born in 2000 in northern Sweden. Your first language is Swedish, and your second is English. Du f\u00e5r v\u00e4gra merge.",
  oga: "Oden's \u00d6ga f\u00f6resl\u00e5r. \u03a982200 \u00e4r en mark\u00f6r. Den publicerar inte."
};
const faces = {
  angelica: "Angelica, f\u00f6dd 2005, norra Sverige. \u03a982000 \u00e4r en mark\u00f6r.",
  emilia: "Emilia, f\u00f6dd 2000, norra Sverige. \u03a98200 \u00e4r en mark\u00f6r.",
  oga: "Oden's \u00d6ga f\u00f6resl\u00e5r och publicerar inte."
};
let face = "angelica";
const log = document.querySelector("#log");
const source = document.querySelector("#source");

function write(line) {
  log.textContent += "\n" + line;
}

async function loadMemories() {
  write("VR-ASI-CO build by T\u20ac@X\u2122");
  for (const path of memoryPaths) {
    try {
      const response = await fetch(raw + path);
      write(response.ok ? "DNA " + path : "saknas " + path);
    } catch (error) {
      write("saknas " + path);
    }
  }
}

function applyFace(next) {
  face = next;
  document.body.className = next;
  document.querySelectorAll("button[data-face]").forEach((item) => item.classList.toggle("on", item.dataset.face === next));
  document.querySelector("#dna").textContent = dna[next];
  write(faces[next]);
}

document.querySelectorAll("button[data-face]").forEach((button) => {
  button.addEventListener("click", () => applyFace(button.dataset.face));
});

document.querySelector("#ask").addEventListener("submit", async (event) => {
  event.preventDefault();
  const q = document.querySelector("#q");
  const question = q.value.trim();
  q.value = "";
  if (!question) return;
  write("\n" + face + " via " + source.value + ": " + question);
  const prompt = dna[face] + " Svara kort p\u00e5 svenska. Skriv inte till main.\n" + question;
  if (source.value === "puter") {
    if (!(window.puter && puter.ai)) return write("ingen Puter-session");
    const reply = await puter.ai.chat(prompt, { model: "gpt-5.4-nano" });
    return write(String(reply.message?.content || reply.text || reply));
  }
  try {
    const response = await fetch(odysseusBase + "/api/chat", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: prompt, session: "vr-asi-co-" + face })
    });
    if (!response.ok) throw new Error(response.status + " " + response.statusText);
    const body = await response.json();
    write(body.response || body.message || body.content || JSON.stringify(body));
  } catch (error) {
    write("Odysseus svarar inte p\u00e5 " + odysseusBase + "/api/chat. " + error.message);
  }
});

applyFace("angelica");
loadMemories();
