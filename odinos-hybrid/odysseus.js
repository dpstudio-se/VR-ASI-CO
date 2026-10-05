const odysseusBase = "http://127.0.0.1:7000";

export async function askOdysseus(message, face) {
  const response = await fetch(odysseusBase + "/api/chat", {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      message: face + "\n" + message,
      session: "vr-asi-co-" + face
    })
  });
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.json();
}
