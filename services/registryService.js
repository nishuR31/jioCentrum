import fs from "fs/promises";

const FILE = new URL("../data/allowedDevices.json", import.meta.url);

function normalizeMac(mac) {
  return mac.trim().toUpperCase();
}

export async function loadRegistry() {
  const raw = await fs.readFile(FILE, "utf8");
  return JSON.parse(raw);
}

export async function saveRegistry(data) {
  await fs.writeFile(FILE, JSON.stringify(data, null, 2));
}

export async function addDevice(mac, label = "device") {
  const registry = await loadRegistry();

  const normalized = normalizeMac(mac);

  const exists = registry.find(d => d.mac === normalized);

  if (exists) {
    throw new Error("Device already exists");
  }

  registry.push({
    mac: normalized,
    label
  });

  await saveRegistry(registry);

  return { mac: normalized, label };
}

export async function removeDevice(mac) {
  const registry = await loadRegistry();

  const normalized = normalizeMac(mac);

  const filtered = registry.filter(d => d.mac !== normalized);

  await saveRegistry(filtered);

  return normalized;
}
