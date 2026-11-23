import { Work } from "@mui/icons-material";
import { Typography } from "@mui/material";

import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import DiagnosisList from "./DiagnosisList";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <Typography>
        {entry.date} <Work aria-hidden="true" /> {entry.employerName}
      </Typography>
      <Typography fontStyle="italic">{entry.description}</Typography>
      <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
      {entry.sickLeave ? (
        <Typography>
          sick leave: {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
        </Typography>
      ) : null}
      <Typography>diagnose by {entry.specialist}</Typography>
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
