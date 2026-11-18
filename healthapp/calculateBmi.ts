const parseArguments = (args: string[]): number[] => {
  if (args.length != 4) throw new Error('Invalid Arg-Count');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return [ Number(args[2]), Number(args[3]) ]
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / (height * height)) * 10000;
  if (bmi < 16) return 'Underweight (Severe thinness)'
  if (bmi < 17) return 'Underweight (Moderate thinness)'
  if (bmi < 18.5) return 'Underweight (Mild thinness)'
  if (bmi < 25) return 'Normal range'
  if (bmi < 30) return 'Overweight (Pre-obeses)'
  if (bmi < 35) return 'Obese (Class I)'
  if (bmi < 40) return 'Obese (Class II)'
  return 'Obese (Class III)'
}

try {
  const [ height, weight ] = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happend.'
  if (error instanceof Error) errorMessage += ' Error: ' + error.message;
  console.log(errorMessage)
}
