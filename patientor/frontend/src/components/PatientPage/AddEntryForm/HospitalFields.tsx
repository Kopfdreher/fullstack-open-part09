import { TextField } from "@mui/material";

interface Props {
  date: string;
  criteria: string;
  onChange: (value: { date: string; criteria: string }) => void;
}

const HospitalFields = ({ date, criteria, onChange }: Props) => (
  <>
    <TextField
      label="Discharge date"
      name="dischargeDate"
      type="date"
      fullWidth
      required
      value={date}
      onChange={({ target }) => onChange({ date: target.value, criteria })}
      slotProps={{ inputLabel: { shrink: true } }}
      sx={{ marginTop: 1 }}
    />
    <TextField
      label="Discharge criteria"
      name="dischargeCriteria"
      fullWidth
      required
      value={criteria}
      onChange={({ target }) => onChange({ date, criteria: target.value })}
      sx={{ marginTop: 1 }}
    />
  </>
);

export default HospitalFields;
