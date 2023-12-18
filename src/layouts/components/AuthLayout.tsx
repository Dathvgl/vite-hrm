import { Layout, Spin } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "~/hooks/useAuth";
import { useGetPersonnelQuery } from "~/redux/personnel/personnelApi";
import { initUser } from "~/redux/personnel/personnelSlice";
import { useAppDispatch, useAppSelector } from "~/redux/store";
import { OnlyChild } from "~/types/base";

const loading = (
  <Layout className="h-screen flex items-center justify-center">
    <Spin tip="Loading" size="large">
      <div className="p-[50px]" />
    </Spin>
  </Layout>
);

export default function AuthLayout({ children }: OnlyChild) {
  const user = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useGetPersonnelQuery(user?.uid);

  useEffect(() => {
    if (typeof user != "undefined") {
      if (user == null) {
        navigate("/");
      }
    }
  }, [user]);

  useEffect(() => {
    dispatch(initUser(data ?? null));
  }, [data]);

  if (typeof user == "undefined") return <>{loading}</>;
  if (user == null) return <>{children}</>;
  return <AuthLayoutSelect>{children}</AuthLayoutSelect>;
}

function AuthLayoutSelect({ children }: OnlyChild) {
  const user = useAppSelector((state) => state.personnelSlice.user);
  if (!user) return <>{loading}</>;
  else return <AuthLayoutLocation>{children}</AuthLayoutLocation>;
}

function AuthLayoutLocation({ children }: OnlyChild) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname == "/") {
      navigate("/home");
    }
  }, [pathname]);

  if (pathname == "/") {
    return <>{loading}</>;
  } else return <>{children}</>;
}
