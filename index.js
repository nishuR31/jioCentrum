import express from "express";
import deviceRoutes from "./routes/deviceRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", deviceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
