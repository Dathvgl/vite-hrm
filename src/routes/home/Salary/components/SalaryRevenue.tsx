import { Button, Col, Form, InputNumber, Row, Space, theme } from "antd";
import { useState } from "react";
import { initSalary } from "~/redux/salary/salaryApi";
import { useAppDispatch } from "~/redux/store";
import { vndInput } from "~/utils/inputNumber";

type SalaryRevenuaType = {
  base: number;
  revenue: number;
  percentage: number;
};

export default function SalaryRevenue() {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [salary, setSalary] = useState<number>();
  const dispatch = useAppDispatch();
  
  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };
  
  function onFinish(values: SalaryRevenuaType) {
    const result = values.base + (values.revenue * values.percentage) / 100;
    
    const salary = Math.ceil(result / 1000) * 1000;
    setSalary(salary);
    dispatch(initSalary(salary));
  }

  function onClear() {
    form.resetFields();
    setSalary(undefined);
  }

  return (
    <Form
      form={form}
      name="salary-revenue"
      style={formStyle}
      onFinish={onFinish}
      initialValues={{ percentage: 10 }}
    >
      <Row gutter={24}>
        <Col span={10}>
          <Form.Item<SalaryRevenuaType>
            name="base"
            label="Lương cứng"
            rules={[{ required: true }]}
          >
            <InputNumber
              className="w-full"
              placeholder="Lương cứng"
              {...vndInput}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item<SalaryRevenuaType>
            name="revenue"
            label="Doanh thu"
            rules={[{ required: true }]}
          >
            <InputNumber
              className="w-full"
              placeholder="Doanh thu bán hàng"
              {...vndInput}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item<SalaryRevenuaType>
            name="percentage"
            label="% lợi ích"
            rules={[{ required: true }]}
          >
            <InputNumber
              className="w-full"
              min={0 as number}
              max={100 as number}
              formatter={(value) => `${value}%`}
              parser={(value) =>
                Number.parseFloat(value?.replace("%", "") ?? "0")
              }
              onClick={(event) =>
                event.currentTarget.setSelectionRange(
                  event.currentTarget.value.length - 1,
                  event.currentTarget.value.length - 1
                )
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          {salary && (
            <strong className="text-red-700 text-3xl">
              {`${salary.toLocaleString().replaceAll(",", ".")} VND`}
            </strong>
          )}
        </Col>
        <Col className="flex justify-end items-center" span={12}>
          <Space size="small">
            <Button type="primary" htmlType="submit">
              Tính lương
            </Button>
            <Button onClick={onClear}>Xóa form</Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}
