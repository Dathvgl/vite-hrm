import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import HomeHeader from "./components/HomeHeader";
import HomeSider from "./components/HomeSider";

export default function HomeLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="h-screen">
      <HomeSider collapsed={collapsed} />
      <Layout>
        <HomeHeader
          collapsed={collapsed}
          callback={() => setCollapsed(!collapsed)}
        />
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
