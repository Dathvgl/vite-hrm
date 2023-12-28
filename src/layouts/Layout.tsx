import { Outlet } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import { Layout as LayoutAntd } from "antd";

export default function Layout() {
  return (
    <LayoutAntd>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </LayoutAntd>
  );
}
