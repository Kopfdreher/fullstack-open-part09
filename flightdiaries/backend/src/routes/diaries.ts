import express, { type Response } from 'express';
import type { NonSensitiveDiaryEntry } from '../types.ts';
import diaryService from '../services/diaryService.ts';
import parseNewDiaryEntry from '../services/utils.ts';

const router = express.Router();

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) res.send(diary);
  else res.sendStatus(404);
});

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = parseNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
