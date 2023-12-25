import RoleBased from "~/components/RoleBased";
import SalaryForm from "./components/SalaryForm";
import SalaryList from "./components/SalaryList";

export default function SalaryPage() {
  return (
    <>
      <SalaryList />
      <RoleBased includes={["boss", "admin"]}>
        {({ passed }) => <>{passed && <SalaryForm />}</>}
      </RoleBased>
    </>
  );
}
