import dotenv from "dotenv";

dotenv.config();

function required(name) {
  const val = process.env[name];
  if (!val) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return val;
}

export const env = {
	routerUrl: required("ROUTER_URL") || "http://192.168.29.1",
  username: required("ROUTER_USERNAME") || "admin",
  password: required("ROUTER_PASSWORD") || "Jiocentrum",
  devicePage: process.env.DEVICE_PAGE || "/device",
  headless: process.env.HEADLESS !== "false",
  interval: process.env.CHECK_INTERVAL || "*/1 * * * *"
};
