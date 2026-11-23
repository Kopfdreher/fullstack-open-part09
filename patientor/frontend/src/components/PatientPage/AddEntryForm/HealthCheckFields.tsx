import { InputLabel, MenuItem, Select } from "@mui/material";
import { HealthCheckRating } from "../../../types";

const ratingOptions = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk" },
];

interface Props {
  value: HealthCheckRating;
  onChange: (value: HealthCheckRating) => void;
}

const HealthCheckFields = ({ value, onChange }: Props) => (
  <>
    <InputLabel id="rating-label" sx={{ marginTop: 2 }}>Health check rating</InputLabel>
    <Select
      labelId="rating-label"
      name="healthCheckRating"
      fullWidth
      value={String(value)}
      onChange={(event) => onChange(Number(event.target.value) as HealthCheckRating)}
    >
      {ratingOptions.map((option) => (
        <MenuItem key={option.value} value={String(option.value)}>{option.label}</MenuItem>
      ))}
    </Select>
  </>
);

export default HealthCheckFields;
