import { validateExercise } from "./validations";
import { exerInput } from "./validations";

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}


const calculateExercises = (values: Array<number>, target: number): Result => {
    const average = values.reduce((i, val) => val + i, 0) / values.length;
    let rating: number;
    if (average > target) rating = 3;
    else if (average === target) rating = 2;
    else rating = 1;
    let ratingDescription: string;
    switch(rating) {
        case 1:
            ratingDescription = "bad";
            break;
        case 2:
            ratingDescription = "average";
            break;
        case 3:
            ratingDescription = "good";
            break;
        default:
            ratingDescription = "unknown";
    }

    return {
        periodLength: values.length,
        trainingDays: values.filter((v) => v != 0).length,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    }
}


const data = validateExercise(process.argv);

const res = calculateExercises(data.values, data.target);
console.log(res);