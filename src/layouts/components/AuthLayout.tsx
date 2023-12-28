import { Layout, Spin } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import useAuth from "~/hooks/useAuth";
import { useGetPersonnelQuery } from "~/redux/personnel/personnelApi";
import { initUser } from "~/redux/personnel/personnelSlice";
import { useAppDispatch, useAppSelector } from "~/redux/store";
import { OnlyChild } from "~/types/base";
import { motion } from "framer-motion";

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

  useEffect(() => {
    if (typeof user != "undefined") {
      if (user == null) {
        navigate("/");
      }
    }
  }, [user]);

  if (typeof user == "undefined") return <>{loading}</>;
  if (user == null) return <>{children}</>;
  return <AuthLayoutQuery id={user.uid}>{children}</AuthLayoutQuery>;
}

function AuthLayoutQuery({ id, children }: OnlyChild & { id: string }) {
  const dispatch = useAppDispatch();
  const { data } = useGetPersonnelQuery(id);

  useEffect(() => {
    dispatch(initUser(data ?? null));
  }, [data]);

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

  const [selectedKeys] = useSessionStorage("menu-select", [""]);

  useEffect(() => {
    if (pathname == "/") {
      const join = selectedKeys.reverse().join("/");
      const path = "/home" + (join == "" ? "" : `/${join}`);

      navigate(path);
    }
  }, [pathname]);

  if (pathname == "/") {
    return <>{loading}</>;
  } else
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {children}
      </motion.div>
    );
}
