

Overview

This service provides a minimal API layer for monitoring devices connected to a JioFiber router and managing a local whitelist of trusted devices. The system automates router inspection using browser automation and compares the active device list with a registry of approved MAC addresses.

The API exposes endpoints that allow clients to retrieve connected devices, manage the whitelist, and integrate with dashboards or automation systems.

The service does not directly control router authentication. Instead, it monitors router state and maintains a trusted device registry used by the monitoring system.

Architecture

```
Client UI / CLI
       │
       ▼
Express API
       │
Controllers
       │
Services
 ├ routerService → fetch devices from router UI
 └ registryService → manage whitelist
       │
Router (192.168.29.1)
```

The router service logs into the router web interface and extracts the device list.
The registry service stores allowed devices locally.

Project Structure

```
jioCentrum/
├ controllers/
│  └ deviceController.js
├ routes/
│  └ deviceRoutes.js
├ services/
│  ├ routerService.js
│  └ registryService.js
├ data/
│  └ allowedDevices.json
├ index.js
└ package.json
```

Data Model

Allowed devices are stored in `data/allowedDevices.json`.

Example:

```
[
  {
    "mac": "AA:BB:CC:DD:EE:01",
    "label": "Laptop"
  },
  {
    "mac": "AA:BB:CC:DD:EE:02",
    "label": "Phone"
  }
]
```

MAC address is treated as the unique identifier.

API Base URL

```
/api
```

Routes

GET /api/devices

Description
Returns the list of currently connected devices detected from the router.

Source
Router admin interface via automated browser session.

Response

```
[
  {
    "name": "Android Device",
    "mac": "AA:BB:CC:DD:EE:01"
  },
  {
    "name": "Laptop",
    "mac": "AA:BB:CC:DD:EE:02"
  }
]
```

Purpose

• inspect current network usage
• detect unknown devices
• integrate with dashboards

---

GET /api/whitelist

Description
Returns the current list of trusted devices.

Response

```
[
  {
    "mac": "AA:BB:CC:DD:EE:01",
    "label": "Laptop"
  },
  {
    "mac": "AA:BB:CC:DD:EE:02",
    "label": "Phone"
  }
]
```

Purpose

• view allowed devices
• audit trusted devices
• display registry in UI

---

POST /api/whitelist

Description
Adds a device to the whitelist.

Request

```
POST /api/whitelist
Content-Type: application/json
```

Body

```
{
  "mac": "AA:BB:CC:DD:EE:11",
  "label": "Friend phone"
}
```

Response

```
{
  "mac": "AA:BB:CC:DD:EE:11",
  "label": "Friend phone"
}
```

Behavior

• normalizes MAC address
• prevents duplicates
• writes entry to registry file

Purpose

• approve a device manually
• allow trusted devices

---

DELETE /api/whitelist/:mac

Description
Removes a device from the whitelist.

Example

```
DELETE /api/whitelist/AA:BB:CC:DD:EE:11
```

Response

```
{
  "removed": "AA:BB:CC:DD:EE:11"
}
```

Purpose

• revoke device access
• clean registry entries

---

Device Monitoring Flow

```
router inspection
       │
connected device list
       │
compare with whitelist
       │
unknown devices detected
```

Example logic used by monitoring service:

```
connectedDevices
      −
allowedDevices
      =
unknownDevices
```

Security Notes

The router admin credentials are required for the monitoring service and should never be exposed publicly.

Recommended practices:

• store router credentials in environment variables
• restrict API access with an API key
• run service only inside local network
• disable router WPS

MAC Randomization

Some devices use randomized MAC addresses for privacy. When enabled, the router sees a different MAC address each time the device connects.

For whitelist-based access control to work reliably, MAC randomization must be disabled for the Wi-Fi network on those devices.

Typical phone settings include:

• Private Address
• Randomized MAC
• MAC Address Randomization

Disable it only for the trusted network.

Usage Examples

Get devices

```
curl http://localhost:3000/api/devices
```

Add whitelist device

```
curl -X POST http://localhost:3000/api/whitelist \
-H "Content-Type: application/json" \
-d '{"mac":"AA:BB:CC:DD:EE:55","label":"tablet"}'
```

Remove device

```
curl -X DELETE http://localhost:3000/api/whitelist/AA:BB:CC:DD:EE:55
```

Running the Server

```
npm install
node index.js
```

Server starts on:

```
http://localhost:3000
```

Possible Extensions

The API can be expanded with additional features such as:

• automatic unknown device alerts
• device tagging (allowed / blocked / guest)
• device history logging
• bandwidth monitoring
• dashboard UI
• automated router blocking via browser automation

These features build on the same architecture by extending the service layer.
