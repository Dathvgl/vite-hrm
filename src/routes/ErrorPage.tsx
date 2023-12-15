import { Button, Layout, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  function onClick() {
    navigate("/");
  }

  return (
    <Layout className="h-screen">
      <Layout.Content className="flex justify-center items-center">
        <Result
          status="404"
          title="404"
          subTitle="Trang này không tồn tại"
          extra={
            <Button type="primary" onClick={onClick}>
              Back Home
            </Button>
          }
        />
      </Layout.Content>
    </Layout>
  );
}
