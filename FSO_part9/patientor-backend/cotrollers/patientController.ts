import { Patient, SafePatient, newPatient } from "../types";
import patients from "../data/patients";
import { v4 as uuidv4 } from "uuid";

export const getSafePatients = (): SafePatient[] => {
  const data: SafePatient[] = patients.map(
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
  };
  patients.push(patient);
  return patient;
};
