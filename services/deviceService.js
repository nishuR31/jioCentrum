import fs from "fs/promises";

const ALLOWED_FILE = new URL("../data/allowedDevices.json", import.meta.url);

export async function loadAllowedDevices() {
  const raw = await fs.readFile(ALLOWED_FILE, "utf8");
  return JSON.parse(raw);
}

export function detectUnknownDevices(devices, allowedDevices) {

  const allowedMacs = allowedDevices.map(d =>
    d.mac.toLowerCase()
  );

  return devices.filter(d =>
    !allowedMacs.includes(d.mac.toLowerCase())
  );
}
