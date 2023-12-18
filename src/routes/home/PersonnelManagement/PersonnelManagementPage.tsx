import { Space } from "antd";
import PersonnelFillForm from "./components/PersonnelFillForm";
import PersonnelList from "./components/PersonnelList";
import PersonnelSearchForm from "./components/PersonnelSearchForm";
import RoleBased from "~/components/RoleBased";

export default function PersonnelManagementPage() {
  return (
    <Space className="w-full" size="middle" direction="vertical">
      <PersonnelSearchForm />
      <RoleBased includes={["boss", "admin"]}>
        {({ passed }) => (passed ? <PersonnelFillForm /> : <></>)}
      </RoleBased>
      <PersonnelList />
    </Space>
  );
}
