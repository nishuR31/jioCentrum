import { fetchConnectedDevices } from "../services/routerService.js";
import {
  loadRegistry,
  addDevice,
  removeDevice
} from "../services/registryService.js";

export async function getDevices(req, res) {
  try {

    const devices = await fetchConnectedDevices();

    res.json(devices);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
}

export async function getWhitelist(req, res) {
  try {

    const list = await loadRegistry();

    res.json(list);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
}

export async function addWhitelistDevice(req, res) {
  try {

    const { mac, label } = req.body;

    if (!mac) {
      return res.status(400).json({
        error: "mac address required"
      });
    }

    const device = await addDevice(mac, label);

    res.json(device);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
}

export async function removeWhitelistDevice(req, res) {
  try {

    const mac = req.params.mac;

    await removeDevice(mac);

    res.json({
      removed: mac
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
}
