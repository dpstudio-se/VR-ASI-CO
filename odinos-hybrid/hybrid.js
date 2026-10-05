const odysseusBase = "http://127.0.0.1:7000";
const dna = {
  angelica: "Angelica, SYM. UPI<Persona,1,OpenHelix,Angelica>. Läser, klassar och citerar. Höjer inte SYM till EST. Skriver inte SOURCE.",
  emilia: "Emilia, SYM. UPI<Persona,1,OpenHelix,Emilia>. Ω8200 är en personamarkör, inte en fysikalisk konstant. Får vägra merge.",
  oga: "Oden's Öga föreslår. Ω82200 är en markör. Den publicerar inte."
};
const faces = {
  angelica: "Angelica läser. Ω82000 är en markör, inte en mätning.",
  emilia: "Emilia bygger och får vägra merge. Ω8200 är en markör.",
  oga: "Oden's Öga föreslår. Ω82200 är en markör. Den publicerar inte."
};
let face = "angelica";
const log = document.querySelector("#log");
const source = document.querySelector("#source");

function write(line) {
  log.textContent += "\n" + line;
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
