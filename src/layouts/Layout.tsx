import { Spin } from "antd";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "~/hooks/useAuth";
import { useGetPersonnelQuery } from "~/redux/personnel/personnelApi";
import { useAppSelector } from "~/redux/store";

export default function Layout() {
  const { pathname } = useLocation();
  const user = useAuth();
  const { refetch } = useGetPersonnelQuery(user?.uid);
  const userSelect = useAppSelector((state) => state.personnelSlice.user);

  const loading = (
    <div className="h-screen flex items-center justify-center">
      <Spin tip="Loading" size="large">
        <div className="p-[50px]" />
      </Spin>
    </div>
  );

  if (user == undefined) return <>{loading}</>;
  if (user == null) return <Navigate to="/" />;
  if (userSelect == null) {
    refetch();
    return <>{loading}</>;
  }

  if (pathname == "/") return <Navigate to="/home" />;

  return <Outlet />;
}
