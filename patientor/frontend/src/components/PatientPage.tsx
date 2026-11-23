import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Patient } from '../types';
import patientService from '../services/patients';
import { Box, Typography } from '@mui/material';
import { Male, Female } from '@mui/icons-material';
import { Gender } from '../types';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
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

  if (!patient) return <p>patient not found</p>;

  const genderIcon = (gender: Gender) => {
    if (gender === Gender.Male) return <Male />;
    if (gender === Gender.Female) return <Female />;
    return null;
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ marginBottom: "0.5em" }}>{patient.name} {genderIcon(patient.gender)}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography>date of birth: {patient.dateOfBirth}</Typography>
    </Box>
  );
};

export default PatientPage;
