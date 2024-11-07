import express from "express";
import { BmiInput } from "./validations";
import { calculateBmi, calculateExercises, Result } from "./calculations";

interface BmiResult {
    weight: number;
    height: number;
    bmi: string;
}

interface ExerciseReqBody {
    daily_exercises: Array<number>;
    target: number;
}

const client = express();
const PORT = 3001;
client.use(express.json());
client.get("/hello", (_, res) => {
  res.status(200).send("Hello Full Stack!");
});



client.get("/bmi", (req, res) => {
    try {
        const weight = Number(req.query.weight);
        const height = Number(req.query.height);
        if (!weight || !height) throw new Error("Malformatted parameters");
        const input: BmiInput = {
            height,
            weight
        };
        const bmi: string = calculateBmi(input.height, input.weight);
        const result: BmiResult = {
            weight,
            height,
            bmi
        };
        res.status(200).send(result);
        

    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(400).send({
                error: e.message
            });
            return;
        }
        res.status(500).send({
            error: "An unknown error occurred"
        });

    }


});

client.post("/exercises", (req, res) => {
    try {
        const input: ExerciseReqBody = req.body as ExerciseReqBody;
        if (!input.daily_exercises || !input.target) throw new Error("Parameters missing");
        const target: number = Number(input.target);
        let values: Array<number>;
        if (isNaN(target)) throw new Error("Malformatted request");
        if (Array.isArray(input.daily_exercises)) {
            values = input.daily_exercises.map((val) => {
                const n = Number(val);
                if (isNaN(n)) throw new Error("Malformatted request");
                return n;
            });
        } else {
            throw new Error("Malformatted request");
        }
        if (values.length < 1) throw new Error("Too few arguments");
        
        const result: Result = calculateExercises(values, target);
        res.status(200).send(result);

    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send({
                error: e.message
            });
            return;
        }
        res.status(500).send({
            error: "Unknown error occurred"
        });
    }


});



client.listen(PORT, () => {
  console.log("Running on port", PORT);
});
