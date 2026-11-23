import { Diagnosis } from "../../types";

interface Props {
  codes?: Array<Diagnosis["code"]>;
  diagnoses: Diagnosis[];
}

const DiagnosisList = ({ codes, diagnoses }: Props) => {
  if (!codes?.length) {
    return null;
  }

  return (
    <ul>
      {codes.map((code) => (
        <li key={code}>
          {code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
        </li>
      ))}
    </ul>
  );
};

export default DiagnosisList;
