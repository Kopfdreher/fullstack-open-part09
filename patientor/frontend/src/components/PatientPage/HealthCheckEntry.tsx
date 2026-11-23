import { Favorite, MedicalServices } from "@mui/icons-material";
import { Typography } from "@mui/material";

import { Diagnosis, HealthCheckEntry } from "../../types";
import DiagnosisList from "./DiagnosisList";

const ratingColor = (rating: HealthCheckEntry["healthCheckRating"]) => {
  switch (rating) {
    case 0:
      return "green";
    case 1:
      return "yellow";
    case 2:
      return "orange";
    case 3:
      return "red";
  }
};

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryDetails = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <Typography>
        {entry.date} <MedicalServices aria-hidden="true" /> Health check
      </Typography>
      <Typography fontStyle="italic">{entry.description}</Typography>
      <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
      <Favorite aria-hidden="true" sx={{ color: ratingColor(entry.healthCheckRating) }} />
      <Typography>diagnose by {entry.specialist}</Typography>
    </div>
  );
};

export default HealthCheckEntryDetails;
