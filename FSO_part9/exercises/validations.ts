export interface BmiInput {
    height: number;
    weight: number;
}

export interface exerInput {
    target: number;
    values: Array<number>
}


export const validateBmiInput = (argv: Array<string>): BmiInput => {
    if (argv.length != 4) throw new Error("Wrong number of args");
    const slicedArgs = argv.slice(2);
    const args = slicedArgs.map((arg) => Number(arg));
    for (const arg of args) {
        if (isNaN(arg)) throw new Error("All args must be numeric");
    }
    return {
        height: args[0],
        weight: args[1]
    }
}

export const validateExercise = (argv: Array<string>): exerInput => {
    if (argv.length < 5) throw new Error("Too few arguments");
    const slicedArgs = argv.slice(2);
    const args = slicedArgs.map((arg) => Number(arg));
    for (const arg of args) {
        if (isNaN(arg)) throw new Error("All args must be numeric");
    }
    return {
        target: args[0],
        values: args.slice(1)
    }

}
