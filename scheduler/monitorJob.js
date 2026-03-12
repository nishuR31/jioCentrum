import cron from "node-cron";
import { env } from "../config/env.js";
import { fetchConnectedDevices } from "../services/routerService.js";
import {
  loadAllowedDevices,
  detectUnknownDevices
} from "../services/deviceService.js";

export function startMonitor() {

  cron.schedule(env.interval, async () => {

    try {

      const devices = await fetchConnectedDevices();
      const allowed = await loadAllowedDevices();

      const unknown = detectUnknownDevices(devices, allowed);

      console.log("Connected Devices:", devices);

      if (unknown.length > 0) {
        console.log("Unknown devices detected:");
        console.table(unknown);
      } else {
        console.log("All devices trusted");
      }

    } catch (err) {
      console.error("Monitor error:", err);
    }

  });

}
