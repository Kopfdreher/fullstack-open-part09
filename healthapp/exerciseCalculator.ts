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

const calculateExercises = (period : number[], target: number): ExerciseRating => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
