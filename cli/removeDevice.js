import { removeDevice } from "../services/registryService.js";

const mac = process.argv[2];

if (!mac) {
  console.log("Usage: node cli/removeDevice.js <MAC>");
  process.exit(1);
}

await removeDevice(mac);

console.log("Device removed:", mac);
