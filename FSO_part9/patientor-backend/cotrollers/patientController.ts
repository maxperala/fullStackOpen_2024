import { Patient, SafePatient, newPatient } from "../types";
import { PATIENTS } from "../config";
import { v4 as uuidv4 } from "uuid";

export const getSafePatients = (): SafePatient[] => {
  const data: SafePatient[] = PATIENTS.map(
    ({ id, name, dateOfBirth, gender, occupation }) => {
      return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
      };
    }
  );
  return data;
};

export const addPatient = (newP: newPatient): Patient => {
  const patient: Patient = {
    ...newP,
    id: uuidv4(),
    entries: [],
  };
  PATIENTS.push(patient);
  return patient;
};

export const getPatient = (id: string): Patient => {
  const patient = PATIENTS.find((p) => p.id === id);

  if (!patient) throw new Error("Invalid ID!");
  return patient;
};
