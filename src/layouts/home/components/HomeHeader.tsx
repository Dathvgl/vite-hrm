import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Flex, Layout, Space, theme } from "antd";
import { Link } from "react-router-dom";

type HomeHeaderProps = {
  collapsed: boolean;
  callback: () => void;
};

export default function HomeHeader({ collapsed, callback }: HomeHeaderProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header style={{ background: colorBgContainer }}>
      <Flex justify="space-between" align="center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={callback}
        />
        <Space>
          <strong>Admin</strong>
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
                  label: <Link to="/">Đăng xuất</Link>,
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
