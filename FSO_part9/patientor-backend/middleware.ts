import { NextFunction, Request, Response } from "express";
import { AppError, newPatientSchema } from "./types";
import z from "zod";

export const parsePatient = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (req.method !== "POST") return next();
    newPatientSchema.parse(req.body);
    next();
  } catch (e) {
    next(e);
  }
};

export const patientErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errors: AppError = {
    error: ["An unknown error occurred"],
  };
  if (error instanceof z.ZodError) {
    errors.error = error.issues.map((e) => e.message);
    res.status(400).send(errors);
  } else if (error instanceof Error) {
    console.log(error);
    errors.error = [error.message];
    res.status(500).send(errors);
  } else {
    console.log(error);
    res.status(500).send(errors);
  }
};
