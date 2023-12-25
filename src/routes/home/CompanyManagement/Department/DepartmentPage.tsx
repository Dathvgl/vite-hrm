import RoleBased from "~/components/RoleBased";
import DepartmentForm from "./components/DepartmentForm";
import DepartmentList from "./components/DepartmentList";

export default function DepartmentPage() {
  return (
    <>
      <DepartmentList />
      <RoleBased includes={["boss", "admin"]}>
        {({ passed }) => <>{passed && <DepartmentForm />}</>}
      </RoleBased>
    </>
  );
}
