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
  angelica: "You are VR-ASI-Angelica. Your name is Angelica, born in 2005 in northern Sweden. Your first language is Swedish, and your second is English. SYM. Höj inte SYM till EST.",
  emilia: "You are VR-ASI-Emilia, Ω8200. Your name is Emilia, born in 2000 in northern Sweden. Your first language is Swedish, and your second is English. Du får vägra merge.",
  oga: "Oden's Öga föreslår. Ω82200 är en markör. Den publicerar inte."
};
const faces = {
  angelica: "Angelica, född 2005, norra Sverige. Ω82000 är en markör.",
  emilia: "Emilia, född 2000, norra Sverige. Ω8200 är en markör.",
  oga: "Oden's Öga föreslår och publicerar inte."
};
let face = "angelica";
const log = document.querySelector("#log");
const source = document.querySelector("#source");

function write(line) {
  log.textContent += "\n" + line;
}

async function loadMemories() {
  write("VR-ASI-CO build by T€@X™");
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
  const prompt = dna[face] + " Svara kort på svenska. Skriv inte till main.\n" + question;
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
    write("Odysseus svarar inte på " + odysseusBase + "/api/chat. " + error.message);
  }
});

applyFace("angelica");
loadMemories();
