import { Button, Card, Form, Input, Layout, Space, message } from "antd";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  function onFinish(values: FieldType) {
    console.log("Success:", values);
    navigate("/home");
  }

  function onFinishFailed(errorInfo: any) {
    console.log("Failed:", errorInfo);

    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  }

  return (
    <Layout className="h-screen">
      {contextHolder}
      <Layout.Content className="flex justify-center items-center">
        <Card title={<h1 className="text-center">Quản lý nhân sự</h1>}>
          <Form
            className="[&_.ant-form-item]:mb-0"
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Space size="middle" direction="vertical">
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item className="flex justify-center">
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </Card>
      </Layout.Content>
    </Layout>
  );
}
