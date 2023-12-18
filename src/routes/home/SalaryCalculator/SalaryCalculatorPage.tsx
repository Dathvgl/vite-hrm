import { Space } from "antd";
import SalaryEstimate from "./components/SalaryEstimate";
import SalaryBonus from "./components/SalaryBonus";

export default function SalaryCalculatorPage() {
  return (
    <Space className="block" direction="vertical">
      <SalaryEstimate />
      <SalaryBonus />
    </Space>
  );
}
