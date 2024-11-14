import { AppError } from "../types";

export const setNewError = (
  setError: React.Dispatch<React.SetStateAction<AppError>>,
  message: string
) => {
  setError(message);
  setTimeout(() => {
    setError(null);
  }, 3000);
};
