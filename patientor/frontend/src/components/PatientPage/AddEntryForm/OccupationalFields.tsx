import { TextField } from "@mui/material";

interface Props {
  employerName: string;
  sickLeaveStart: string;
  sickLeaveEnd: string;
  onChange: (value: { employerName: string; sickLeaveStart: string; sickLeaveEnd: string }) => void;
}

const OccupationalFields = ({ employerName, sickLeaveStart, sickLeaveEnd, onChange }: Props) => (
  <>
    <TextField
      label="Employer name"
      name="employerName"
      fullWidth
      required
      value={employerName}
      onChange={({ target }) => onChange({ employerName: target.value, sickLeaveStart, sickLeaveEnd })}
      sx={{ marginTop: 1 }}
    />
    <TextField
      label="Sick leave start"
      name="sickLeaveStart"
      type="date"
      fullWidth
      value={sickLeaveStart}
      onChange={({ target }) => onChange({ employerName, sickLeaveStart: target.value, sickLeaveEnd })}
      slotProps={{ inputLabel: { shrink: true } }}
      sx={{ marginTop: 1 }}
    />
    <TextField
      label="Sick leave end"
      name="sickLeaveEnd"
      type="date"
      fullWidth
      value={sickLeaveEnd}
      onChange={({ target }) => onChange({ employerName, sickLeaveStart, sickLeaveEnd: target.value })}
      slotProps={{ inputLabel: { shrink: true } }}
      sx={{ marginTop: 1 }}
    />
  </>
);

export default OccupationalFields;
