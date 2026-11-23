import { LocalHospital } from "@mui/icons-material";
import { Typography } from "@mui/material";

import { Diagnosis, HospitalEntry } from "../../types";
import DiagnosisList from "./DiagnosisList";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryDetails = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <Typography>
        {entry.date} <LocalHospital aria-hidden="true" /> Hospital
      </Typography>
      <Typography fontStyle="italic">{entry.description}</Typography>
      <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
      <Typography>
        discharged {entry.discharge.date}: {entry.discharge.criteria}
      </Typography>
      <Typography>diagnose by {entry.specialist}</Typography>
    </div>
  );
};

export default HospitalEntryDetails;
