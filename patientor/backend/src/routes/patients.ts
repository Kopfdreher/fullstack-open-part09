import express, { type Response, type Request } from 'express';
import type { Patient, NewPatient, NonSensitivePatient } from '../types.ts';
import patientService from '../services/patientService.ts';
import { newPatientParser, errorMiddleware } from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
