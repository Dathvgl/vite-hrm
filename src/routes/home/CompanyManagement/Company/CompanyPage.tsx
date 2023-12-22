import RoleBased from "~/components/RoleBased";
import CompanyForm from "./components/CompanyForm";
import CompanyList from "./components/CompanyList";

export default function CompanyPage() {
  return (
    <>
      <CompanyList />
      <RoleBased includes={["boss", "admin"]}>
        {({ passed }) => (passed ? <CompanyForm /> : <></>)}
      </RoleBased>
    </>
  );
}
