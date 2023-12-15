import { HomeOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

export default function HomeSider({ collapsed }: { collapsed: boolean }) {
  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="w-full h-[64px] text-slate-300 flex justify-center items-center">
        <h1>
          <em>{collapsed ? "fs" : "fsfssfssfsfsfs"}</em>
        </h1>
      </div>
      <Menu
        className="px-2"
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <HomeOutlined />,
            label: "Dashboard",
          },
          {
            key: "2",
            icon: <UserSwitchOutlined />,
            label: "Quản lý nhân viên",
          },
        ]}
      />
    </Layout.Sider>
  );
}
