import { Space } from "antd";
import PersonnelFillForm from "./components/PersonnelFillForm";
import PersonnelList from "./components/PersonnelList";
import PersonnelSearchForm from "./components/PersonnelSearchForm";

export default function PersonnelManagementPage() {
  return (
    <Space className="w-full" size="middle" direction="vertical">
      <PersonnelSearchForm />
      <PersonnelFillForm />
      <PersonnelList />
    </Space>
  );
}
