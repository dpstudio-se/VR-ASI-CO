import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const startup = fileURLToPath(new URL("../startup.sh", import.meta.url));
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function until(predicate) {
  const deadline = Date.now() + 3000;
  while (Date.now() < deadline) {
    if (predicate()) return;
    await pause(25);
  }
  assert.fail("startup fixture did not reach the expected state");
}

function lines(file) {
  try { return fs.readFileSync(file, "utf8").trim().split("\n").filter(Boolean); }
  catch { return []; }
}

function fixture(t, { installed = true } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "vr asi co startup "));
  const bin = path.join(root, "bin");
  fs.mkdirSync(bin);
  fs.copyFileSync(startup, path.join(root, "startup.sh"));
  if (installed) fs.mkdirSync(path.join(root, "node_modules"));
  const executable = (name, body) => fs.writeFileSync(path.join(bin, name), "#!/bin/sh\nset -eu\n" + body, { mode: 0o755 });
  executable("curl", 'exit "${STUB_HEALTH:-22}"\n');
  executable("node", 'printf "%s\\n" "$PWD|$*" >> "$STUB_ROOT/preview"\n');
  executable("npm", 'printf "%s\\n" "$PWD|$*|${__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS:-unset}" >> "$STUB_ROOT/launches"\nwhile [ ! -f "$STUB_ROOT/stop" ]; do sleep 0.05; done\nprintf "done\\n" >> "$STUB_ROOT/exits"\n');
  const launches = path.join(root, "launches");
  t.after(async () => {
    fs.writeFileSync(path.join(root, "stop"), "stop");
    if (lines(launches).length) await until(() => lines(path.join(root, "exits")).length >= lines(launches).length);
    fs.rmSync(root, { recursive: true, force: true });
  });
  const run = (env = {}) => new Promise((resolve, reject) => {
    const child = spawn("sh", [path.join(root, "startup.sh")], {
      cwd: path.dirname(root),
      env: { ...process.env, CODESPACES: "", __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS: "", ...env, STUB_ROOT: root, PATH: bin + path.delimiter + process.env.PATH },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let out = "", err = "";
    child.stdout.on("data", (value) => { out += value; });
    child.stderr.on("data", (value) => { err += value; });
    child.on("error", reject);
    child.on("close", (code) => resolve({ code, out, err }));
  });
  return { root, run, launches };
}

test("healthy dev is left running from a different cwd and a path containing spaces", async (t) => {
  const f = fixture(t, { installed: false });
  assert.equal((await f.run({ STUB_HEALTH: "0" })).code, 0);
  assert.equal(lines(f.launches).length, 0);
  assert.deepEqual(lines(path.join(f.root, "preview")), [`${f.root}|scripts/preview.mjs stop`]);
});

test("missing dependencies fail instead of reporting a successful launch", async (t) => {
  const f = fixture(t, { installed: false });
  const result = await f.run();
  assert.equal(result.code, 1);
  assert.match(result.err, /dependencies missing/);
  assert.equal(lines(f.launches).length, 0);
});

test("concurrent cold starts launch once and a stopped process can restart", async (t) => {
  const f = fixture(t);
  const results = await Promise.all([f.run(), f.run()]);
  assert(results.every((result) => result.code === 0));
  await until(() => lines(f.launches).length === 1);
  // The losing flock command has already returned; neither launcher waits for the dev process.
  await pause(100);
  assert.equal(lines(f.launches).length, 1);
  assert.equal(lines(f.launches)[0], `${f.root}|run dev|unset`);
  assert(results.every((result) => /readiness is pending/.test(result.out)));
  fs.writeFileSync(path.join(f.root, "stop"), "stop");
  await until(() => lines(path.join(f.root, "exits")).length === 1);
  await pause(100);
  fs.unlinkSync(path.join(f.root, "stop"));
  assert.equal((await f.run()).code, 0);
  await until(() => lines(f.launches).length === 2);
});

test("Codespaces permits only its dev hostname and keeps the npm env wrapper", async (t) => {
  const f = fixture(t);
  assert.equal((await f.run({ CODESPACES: "true", CODESPACE_NAME: "example-space", GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN: "app.github.dev" })).code, 0);
  await until(() => lines(f.launches).length === 1);
  assert.equal(lines(f.launches)[0], `${f.root}|run dev|example-space-8080.app.github.dev`);
});

test("non-Codespaces startup preserves an explicit allowed host", async (t) => {
  const f = fixture(t);
  assert.equal((await f.run({ __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS: "preview.example.test" })).code, 0);
  await until(() => lines(f.launches).length === 1);
  assert.equal(lines(f.launches)[0], `${f.root}|run dev|preview.example.test`);
});
