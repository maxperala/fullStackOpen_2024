import { Router, Response, Request, NextFunction } from "express";
import { getSafePatients, addPatient } from "../cotrollers/patientController";
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

patientRouter.use(patientErrorHandler);

export default patientRouter;
