import { Router, Response } from "express";
import diagnoses from "../data/diagnoses";
import { Diagnose } from "../types";

const diagnoseRouter: Router = Router();

diagnoseRouter.get("/", (_, res: Response<Diagnose[]>) => {
  res.status(200);
  res.send(diagnoses);
});

export default diagnoseRouter;
