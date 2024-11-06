import { validateBmiInput } from "./validations";
import { BmiInput } from "./validations";


const calculateBmi = (height: number, weight: number): string => {
    if (isNaN(height) || isNaN(weight)) return "Please insert valid numbers";
    const h = height / 100;
    const bmi = weight / Math.pow(h, 2);

    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal range";
    return "Overweight";
}



const argv = process.argv;
const bmiArgs = validateBmiInput(argv);

console.log(calculateBmi(bmiArgs.height, bmiArgs.weight));