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
  routerUrl: required("ROUTER_URL"),
  username: required("ROUTER_USERNAME"),
  password: required("ROUTER_PASSWORD"),
  devicePage: process.env.DEVICE_PAGE || "/device",
  headless: process.env.HEADLESS !== "false",
  interval: process.env.CHECK_INTERVAL || "*/1 * * * *"
};
