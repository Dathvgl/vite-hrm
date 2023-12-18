import { Outlet } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";

export default function Layout() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
