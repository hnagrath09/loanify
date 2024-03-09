import { ReactNode, createContext, useState } from "react";

type FormFields = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female" | "other";
  maritalStatus?: "single" | "married";
  pan?: string;
  aadhaar?: string;
  address?: string;
  employmentType?: "salaried" | "self-employed";
  loanPurpose?:
    | "home-loan"
    | "personal-loan"
    | "education-loan"
    | "vehicle-loan";
  amountRequired?: number;
  identityProof?: "aadhaar" | "pan" | "passport" | "voter" | "drivingLicense";
};

export const AppStateContext = createContext<
  [FormFields, (fields: FormFields) => void]
>([{}, () => {}]);

export function AppProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<FormFields>({
    employmentType: "salaried",
    amountRequired: 100000,
    identityProof: "aadhaar",
  });
  console.log(value);

  return (
    <AppStateContext.Provider value={[value, setValue]}>
      {children}
    </AppStateContext.Provider>
  );
}
