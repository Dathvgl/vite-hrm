import RoleBased from "~/components/RoleBased";
import PositionForm from "./components/PositionForm";
import PositionList from "./components/PositionList";

export default function PositionPage() {
  return (
    <>
      <PositionList />
      <RoleBased includes={["boss", "admin"]}>
        {({ passed }) => <>{passed && <PositionForm />}</>}
      </RoleBased>
    </>
  );
}
