import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "~/hooks/useAuth";
import { useGetPersonnelQuery } from "~/redux/personnel/personnelApi";
import { useAppSelector } from "~/redux/store";

export default function Layout() {
  const user = useAuth();
  const navigate = useNavigate();
  const { refetch } = useGetPersonnelQuery(user?.uid);

  const userSelect = useAppSelector((state) => state.personnelSlice.user);

  useEffect(() => {
    if (!userSelect) {
      if (user) refetch();
      else navigate("/");
    } else navigate("/home");
  }, [user, userSelect]);

  return <Outlet />;
}
