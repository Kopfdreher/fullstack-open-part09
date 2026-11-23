import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Patient, Diagnosis, Gender, NewEntry } from '../../types';
import patientService from '../../services/patients';
import { Box, Button, Typography } from '@mui/material';
import { Male, Female } from '@mui/icons-material';
import EntryDetails from './EntryDetails';
import AddEntryForm from './AddEntryForm';

interface Props {
  diagnoses: Diagnosis[];
}
const formatError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data;
    if (data && typeof data === "object" && "error" in data && Array.isArray(data.error)) {
      return data.error
        .map((issue: { path?: (string | number)[]; message?: string }) => {
          const field = issue.path?.join(".") || "entry";
          return `${field}: ${issue.message ?? "invalid value"}`;
        })
        .join("; ");
    }
    return "Unrecognized axios error";
  }
  return "Unknown error";
};

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string>();
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getById(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [id]);

  const submitEntry = async (values: NewEntry) => {
    if (!patient) return;
    try {
      const entry = await patientService.addEntry(patient.id, values);
      setPatient({ ...patient, entries: patient.entries.concat(entry) });
      setShowForm(false);
      setError(undefined);
    } catch (e: unknown) {
      setError(formatError(e));
    }
  };

  if (!patient) return <p>patient not found</p>;

  const genderIcon = (gender: Gender) => {
    if (gender === Gender.Male) return <Male />;
    if (gender === Gender.Female) return <Female />;
    return null;
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: "0.5em" }}>{patient.name} {genderIcon(patient.gender)}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography>date of birth: {patient.dateOfBirth}</Typography><br/>
      <Typography variant="h6" sx={{ marginBottom: "0.5em" }}>entries</Typography>
      {showForm
        ? <AddEntryForm
            diagnoses={diagnoses}
            error={error}
            onSubmit={(values) => { void submitEntry(values); }}
            onCancel={() => { setShowForm(false); setError(undefined); }}
          />
        : <Button variant="contained" sx={{ marginBottom: 2 }} onClick={() => setShowForm(true)}>Add New Entry</Button>
      }
      {patient.entries.map((entry) => (
        <div key={entry.id} style={{ marginBottom: "1em" }}>
          <EntryDetails entry={entry} diagnoses={diagnoses} />
        </div>
      ))}
    </Box>
  );
};

export default PatientPage;
