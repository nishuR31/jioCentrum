import { addDevice } from "../services/registryService.js";

const mac = process.argv[2];
const label = process.argv[3] || "device";

if (!mac) {
  console.log("Usage: node cli/addDevice.js <MAC> [label]");
  process.exit(1);
}

try {
  const device = await addDevice(mac, label);
  console.log("Device added:", device);
} catch (err) {
  console.error(err.message);
}
