import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Row,
  Space,
  theme,
} from "antd";
import { useState } from "react";
import { useAppSelector } from "~/redux/store";

type SalaryBonusType = {
  months: number;
  holiday?: string[];
};

export default function SalaryBonus() {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [salary, setSalary] = useState<number>();

  const calculated = useAppSelector((state) => state.salarySlice.salary);

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  function onFinish(values: SalaryBonusType) {
    if (!calculated) return;
    const result = (values.months / 12) * calculated;

    const salary = Math.ceil(result / 1000) * 1000;
    let bonus = 0;

    values.holiday?.forEach((_) => {
      bonus += salary * 0.1;
    });

    setSalary(salary + bonus);
  }

  function onClear() {
    form.resetFields();
    setSalary(undefined);
  }

  if (!calculated) return <></>;

  return (
    <Space className="block" direction="vertical">
      <h1 style={{ color: token.colorText }}>Thưởng lương</h1>
      <Form
        form={form}
        name="salary-revenue"
        style={formStyle}
        onFinish={onFinish}
      >
        <Form.Item name="months" label="Số tháng" rules={[{ required: true }]}>
          <InputNumber
            className="w-full"
            min={1 as number}
            max={12 as number}
            placeholder="Số tháng làm trong năm"
          />
        </Form.Item>
        <Form.Item
          name="holiday"
          label={
            <div className="text-left">
              <p>Một số ngày lễ /</p>
              <p>ngày nghỉ có lương</p>
            </div>
          }
        >
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox value="amlich">Tết âm lịch</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="giaiphong">Ngày Giải Phóng</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="laodong">Quốc tế lao động</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="quockhanh">Quốc khánh</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="hungvuong">Giỗ tổ Hùng Vương</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="special">Kết hôn / Lễ tang</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Row gutter={24}>
          <Col span={12}>
            {salary && (
              <strong className="text-red-700 text-3xl">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">+</div>
                  <div className="flex flex-col">
                    <div>{`${calculated
                      .toLocaleString()
                      .replaceAll(",", ".")} VND`}</div>
                    <div>{`${salary
                      .toLocaleString()
                      .replaceAll(",", ".")} VND`}</div>
                  </div>
                </div>
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
    </Space>
  );
}
