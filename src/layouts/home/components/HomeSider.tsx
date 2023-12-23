import {
  ApartmentOutlined,
  AuditOutlined,
  CalendarOutlined,
  ContainerOutlined,
  DesktopOutlined,
  DollarOutlined,
  HomeOutlined,
  ProjectOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";

export default function HomeSider({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useSessionStorage("menu-select", [
    "",
  ]);

  function onSelect({ keyPath }: { keyPath: string[] }) {
    const join = keyPath.reverse().join("/");
    const path = "/home" + (join == "" ? "" : `/${join}`);

    navigate(path);
    setSelectedKeys(keyPath);
  }

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="w-full h-[64px] text-slate-300 flex justify-center items-center">
        <h1>
          <em>{collapsed ? "fs" : "fsfssfssfsfsfs"}</em>
        </h1>
      </div>
      <Menu
        className="px-1 select-none"
        theme="dark"
        mode="inline"
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        defaultOpenKeys={["company-management"]}
        items={[
          {
            key: "",
            icon: <HomeOutlined />,
            label: "Tổng quan",
          },
          {
            key: "personnel-management",
            icon: <TeamOutlined />,
            label: "QL nhân viên",
          },
          {
            key: "company-management",
            icon: <ApartmentOutlined />,
            label: "QL công ty",
            children: [
              { key: "company", icon: <DesktopOutlined />, label: "Công ty" },
              {
                key: "personnel",
                icon: <UserSwitchOutlined />,
                label: "Nhân viên",
              },
              {
                key: "department",
                icon: <ProjectOutlined />,
                label: "Phòng ban",
              },
              {
                key: "position",
                icon: <ContainerOutlined />,
                label: "Chức vụ",
              },
            ],
          },
          {
            key: "salary-calculator",
            icon: <DollarOutlined />,
            label: "Tính lương",
          },
          {
            key: "vacation",
            icon: <CalendarOutlined />,
            label: "Nghỉ phép",
          },
          {
            key: "personnel-role",
            icon: <AuditOutlined />,
            label: "Phân quyền",
          },
        ]}
      />
    </Layout.Sider>
  );
}
