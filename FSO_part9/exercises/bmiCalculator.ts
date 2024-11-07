import { validateBmiInput } from "./validations";
import { calculateBmi } from "./calculations";



const argv = process.argv;
const bmiArgs = validateBmiInput(argv);

console.log(calculateBmi(bmiArgs.height, bmiArgs.weight));