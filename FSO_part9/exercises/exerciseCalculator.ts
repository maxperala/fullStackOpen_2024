import { validateExercise } from "./validations";
import { calculateExercises, Result } from "./calculations";




const data = validateExercise(process.argv);

const res: Result = calculateExercises(data.values, data.target);
console.log(res);