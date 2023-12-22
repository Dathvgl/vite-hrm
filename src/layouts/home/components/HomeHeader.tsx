import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Flex, Layout, Space, theme } from "antd";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAppSelector } from "~/redux/store";
import { authFB } from "~/utils/firebase";
import HomeSelect from "./HomeSelect";

type HomeHeaderProps = {
  collapsed: boolean;
  callback: () => void;
};

export default function HomeHeader({ collapsed, callback }: HomeHeaderProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const user = useAppSelector((state) => state.personnelSlice.user);

  function onSignOut() {
    signOut(authFB);
  }

  return (
    <Layout.Header className="px-4" style={{ background: colorBgContainer }}>
      <Flex justify="space-between" align="center">
        <Space>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={callback}
          />
          <HomeSelect />
        </Space>
        <Space>
          <strong>{`${user?.name} | ${user?.email}`}</strong>
          <Dropdown
            placement="bottomRight"
            menu={{
              items: [
                {
                  key: "1",
                  label: <Link to="/home/info">Thông tin</Link>,
                },
                {
                  key: "2",
                  label: <span onClick={onSignOut}>Đăng xuất</span>,
                },
              ],
            }}
          >
            <Button type="text" shape="circle" icon={<UserOutlined />} />
          </Dropdown>
        </Space>
      </Flex>
    </Layout.Header>
  );
}
