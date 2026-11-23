import patients from '../../data/patients.ts';
import type { NewPatient, NonSensitivePatient, Patient } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatient = ( id: string ): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }: NonSensitivePatient) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatient, getNonSensitivePatients, addPatient };
