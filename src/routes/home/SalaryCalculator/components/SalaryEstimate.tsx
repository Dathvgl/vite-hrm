import { Space, Tabs, theme } from "antd";
import SalaryContract from "./SalaryContract";
import SalaryProduct from "./SalaryProduct";
import SalaryRevenue from "./SalaryRevenue";
import SalaryTime from "./SalaryTime";

export default function SalaryEstimate() {
  const { token } = theme.useToken();

  return (
    <Space className="block" direction="vertical">
      <h1 style={{ color: token.colorText }}>Tính lương</h1>
      <Tabs
        defaultActiveKey="SalaryTime"
        destroyInactiveTabPane
        items={[
          {
            key: "SalaryTime",
            label: "Theo thời gian",
            children: <SalaryTime />,
          },
          {
            key: "SalaryRevenue",
            label: "Theo doanh thu",
            children: <SalaryRevenue />,
          },
          {
            key: "SalaryContract",
            label: "Theo lương khoán",
            children: <SalaryContract />,
          },
          {
            key: "SalaryProduct",
            label: "Theo sản phẩm",
            children: <SalaryProduct />,
          },
        ]}
      />
    </Space>
  );
}
