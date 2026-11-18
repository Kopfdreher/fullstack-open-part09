import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { type ExercisePlan, type ExerciseRating, calculateExercises } from './exerciseCalculator.ts';
import { toNums } from './utils.ts';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
  const [ weight, height ] = toNums([ req.query.weight as string, req.query.height as string ]);
  const bmi = calculateBmi(height, weight);
  res.send({ weight, height, bmi });
  } catch {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  try {
    const body = req.body as ExercisePlan;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!req.body || !req.body.daily_exercises || req.body.target === undefined) {
      return res.status(400).json({ error: 'parameters missing' });
    }
    const [ target, ...period ] = toNums([ body.target, ...body.daily_exercises ]);
    const rating: ExerciseRating = calculateExercises(period, target);
    res.send( rating );
  } catch {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
