import { useState, SyntheticEvent } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
  Box,
  Alert,
} from "@mui/material";
import { Diagnosis, HealthCheckRating, NewEntry } from "../../../types";
import HealthCheckFields from "./HealthCheckFields";
import HospitalFields from "./HospitalFields";
import OccupationalFields from "./OccupationalFields";

interface Props {
  diagnoses: Diagnosis[];
  error?: string;
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const entryTypes = ["HealthCheck", "Hospital", "OccupationalHealthcare"] as const;
type EntryType = (typeof entryTypes)[number];

const AddEntryForm = ({ diagnoses, error, onSubmit, onCancel }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [discharge, setDischarge] = useState({ date: "", criteria: "" });
  const [occupational, setOccupational] = useState({ employerName: "", sickLeaveStart: "", sickLeaveEnd: "" });

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const base = {
      description,
      date,
      specialist,
      ...(diagnosisCodes.length > 0 ? { diagnosisCodes } : {}),
    };

    if (type === "HealthCheck") {
      onSubmit({ ...base, type, healthCheckRating });
    } else if (type === "Hospital") {
      onSubmit({ ...base, type, discharge });
    } else {
      const { employerName, sickLeaveStart, sickLeaveEnd } = occupational;
      onSubmit({
        ...base,
        type,
        employerName,
        ...(sickLeaveStart && sickLeaveEnd
          ? { sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd } }
          : {}),
      });
    }
  };

  return (
    <Box component="form" method="post" onSubmit={addEntry} aria-labelledby="add-entry-heading" sx={{ marginBottom: 2 }}>
      <InputLabel id="add-entry-heading">Entry type</InputLabel>
      <Select
        labelId="add-entry-heading"
        name="type"
        fullWidth
        value={type}
        onChange={(event: SelectChangeEvent) => setType(event.target.value as EntryType)}
      >
        {entryTypes.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>

      <TextField
        label="Description"
        name="description"
        fullWidth
        required
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        sx={{ marginTop: 1 }}
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        fullWidth
        required
        value={date}
        onChange={({ target }) => setDate(target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{ marginTop: 1 }}
      />
      <TextField
        label="Specialist"
        name="specialist"
        fullWidth
        required
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        sx={{ marginTop: 1 }}
      />

      <InputLabel id="diagnosis-label" sx={{ marginTop: 2 }}>Diagnosis codes</InputLabel>
      <Select
        labelId="diagnosis-label"
        name="diagnosisCodes"
        multiple
        fullWidth
        value={diagnosisCodes}
        onChange={(event) => {
          const value = event.target.value;
          setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
        }}
        renderValue={(selected) => selected.join(", ")}
      >
        {diagnoses.map((diagnosis) => (
          <MenuItem key={diagnosis.code} value={diagnosis.code}>
            {diagnosis.code} {diagnosis.name}
          </MenuItem>
        ))}
      </Select>

      {type === "HealthCheck" && (
        <HealthCheckFields value={healthCheckRating} onChange={setHealthCheckRating} />
      )}
      {type === "Hospital" && (
        <HospitalFields date={discharge.date} criteria={discharge.criteria} onChange={setDischarge} />
      )}
      {type === "OccupationalHealthcare" && (
        <OccupationalFields {...occupational} onChange={setOccupational} />
      )}

      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
        <Button color="secondary" variant="contained" type="button" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained">Add</Button>
      </Box>
    </Box>
  );
};

export default AddEntryForm;
