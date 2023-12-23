import { Button, Card, Form, Input, Layout, Space, message } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authFB } from "~/utils/firebase";

type FieldType = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const [messageApi, contextHolder] = message.useMessage();

  async function onFinish(values: Required<FieldType>) {
    try {
      await signInWithEmailAndPassword(authFB, values.email, values.password);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Đăng nhập thất bại",
      });
    }
  }

  function onFinishFailed(errorInfo: any) {
    console.log("Failed:", errorInfo);

    messageApi.open({
      type: "error",
      content: "Đăng nhập thất bại",
    });
  }

  return (
    <Layout className="h-screen">
      {contextHolder}
      <Layout.Content className="flex justify-center items-center">
        <Card title={<h1 className="text-center">Quản lý nhân sự</h1>}>
          <Form
            className="[&_.ant-form-item]:mb-0"
            labelCol={{ span: 8 }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Space size="middle" direction="vertical">
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
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
