import patients from "./data/patients";
import { Patient } from "./types";

export const PATIENTS: Patient[] = patients.map((p) => {
  return {
    ...p,
    entries: [],
  };
});
