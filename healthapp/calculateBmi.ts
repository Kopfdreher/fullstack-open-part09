const parseArguments = (args: string[]): number[] => {
  if (args.length != 4) throw new Error('Invalid Arg-Count');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return [ Number(args[2]), Number(args[3]) ]
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): string => {
  return 'Normal range';
}

try {
  const [ height, weight ] = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = 'Something bad happend.'
  if (error instanceof Error) errorMessage += ' Error: ' + error.message;
  console.log(errorMessage)
}
