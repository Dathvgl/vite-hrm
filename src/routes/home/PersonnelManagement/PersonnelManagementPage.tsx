import { Space } from "antd";
import PersonnelForm from "./components/PersonnelForm";
import PersonnelList from "./components/PersonnelList";

export default function PersonnelManagementPage() {
  return (
    <Space className="w-full" size="middle" direction="vertical">
      <PersonnelForm />
      <PersonnelList />
    </Space>
  );
}
