import RoleBased from "~/components/RoleBased";
import VacationForm from "./components/VacationForm";
import VacationList from "./components/VacationList";

export default function VacationPage() {
  return (
    <>
      <VacationList />
      <RoleBased includes={["boss", "admin"]}>
        {({ passed }) => <>{passed && <VacationForm />}</>}
      </RoleBased>
    </>
  );
}
