import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SimpleBar from "simplebar-react";
import HomeHeader from "./components/HomeHeader";
import HomeSider from "./components/HomeSider";

export default function HomeLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="h-screen">
      <HomeSider collapsed={collapsed} />
      <Layout className="flex">
        <HomeHeader
          collapsed={collapsed}
          callback={() => setCollapsed(!collapsed)}
        />
        <SimpleBar className="h-[calc(100%-64px)]">
          <Layout.Content className="p-4 ">
            <Outlet />
          </Layout.Content>
        </SimpleBar>
      </Layout>
    </Layout>
  );
}
