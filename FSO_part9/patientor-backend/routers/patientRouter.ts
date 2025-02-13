import { Router, Response, Request, NextFunction } from "express";
import {
  getSafePatients,
  addPatient,
  getPatient,
} from "../cotrollers/patientController";
import { newPatient, Patient, SafePatient } from "../types";
import { parsePatient, patientErrorHandler } from "../middleware";

const patientRouter: Router = Router();

patientRouter.use(parsePatient);

patientRouter.get("/", (_, res: Response<SafePatient[]>) => {
  res.send(getSafePatients());
});

patientRouter.post(
  "/",
  (
    req: Request<unknown, unknown, newPatient>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newP: newPatient = req.body;
      const patient: Patient = addPatient(newP);
      res.status(200).json(patient);
    } catch (e) {
      next(e);
    }
  }
);

patientRouter.get(
  "/:id",
  (req: Request, res: Response<Patient>, next: NextFunction) => {
    try {
      const id: string | undefined = req.params.id;
      if (!id) throw new Error("No patient ID provided!");
      const patient = getPatient(id);
      res.status(200).json(patient);
    } catch (e) {
      next(e);
    }
  }
);

patientRouter.use(patientErrorHandler);

export default patientRouter;
