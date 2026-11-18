import { parseArguments } from './utils.ts'

interface ExerciseRating {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
const getRating = (diff: number): number => {
  if (diff < 0) return 3;
  if (diff < 1) return 2
  return 1
}

const getRatingDescription = (rating: number): string => {
  if (rating == 3) return 'amazing plan, let\'s go!';
  if (rating == 2) return 'not too bad but could be better';
  return 'please improve your plan';
}

export const calculateExercises = (period : number[], target: number): ExerciseRating => {
  const periodLength = period.length;
  const trainingDays = period.filter(n => n > 0).length;
  const average = period.reduce((sum, n) => sum + n, 0) / period.length;
  const success = (average) > target;
  const rating = getRating(target - average);
  const ratingDescription = getRatingDescription(rating);
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const [target, ...period] = parseArguments(process.argv, 0)
  console.log(calculateExercises(period, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happend.'
  if (error instanceof Error) errorMessage += ' Error: ' + error.message
  console.log(errorMessage)
}
