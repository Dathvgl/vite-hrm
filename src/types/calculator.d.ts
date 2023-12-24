export type CalculatorSalaryType = {
  id: string;
  stt: number;
  name: number;
  position: string;
  department: string;
  salaryBase: number;
  salaryType: string;
  salaryAllowance?: number;
  salaryCalc: number;
  salaryBonus?: number;
};

export type CalculatorSalaryAggregateType = Omit<CalculatorSalaryType, "salaryCalc" | "salaryBonus"> & {
  salaryTypeCalc: SalaryTypeType;
  days: number[];
};
