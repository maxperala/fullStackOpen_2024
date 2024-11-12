import express from "express";
import * as cors from "cors";
import patientRouter from "./routers/patientRouter";
import diagnoseRouter from "./routers/diagnoseRouter";

const app = express();
app.use(cors.default());
app.use(express.json());
app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_, res) => {
  console.log("ping recieved");
  res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
