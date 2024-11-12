import z from "zod";

export type Gender = "male" | "female" | "other";

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export const newPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(1),
  gender: z.enum(["male", "female", "other"]),
  occupation: z.string(),
});

export type newPatient = z.infer<typeof newPatientSchema>;

export interface Patient extends newPatient {
  id: string;
}

export type AppError = {
  error: string[];
};

export type SafePatient = Omit<Patient, "ssn">;
