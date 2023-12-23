import {
  Button,
  Col,
  Form,
  InputNumber,
  Row,
  Space,
  Tooltip,
  theme,
} from "antd";
import { useState } from "react";
import { initSalary } from "~/redux/salary/salarySlice";
import { useAppDispatch } from "~/redux/store";
import { vndInput } from "~/utils/inputNumber";

type SalaryTimeType = {
  base: number;
  allowance?: number;
  standardDay: number;
  workDay: number;
};

export default function SalaryTime() {
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

  function onFinish(values: SalaryTimeType) {
    const result =
      ((values.base + (values.allowance ?? 0)) / values.standardDay) *
      values.workDay;

    const salary = Math.ceil(result / 1000) * 1000;
    setSalary(salary);
    dispatch(initSalary(salary));
  }

  function onClear() {
    form.resetFields();
    setSalary(undefined);
  }

  return (
    <Form form={form} name="salary-time" style={formStyle} onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item<SalaryTimeType>
            name="base"
            label="Lương"
            rules={[{ required: true }]}
          >
            <InputNumber className="w-full" placeholder="Lương" {...vndInput} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<SalaryTimeType> name="allowance" label="Phụ cấp">
            <InputNumber
              className="w-full"
              placeholder="Phụ cấp (nếu có)"
              {...vndInput}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item<SalaryTimeType>
            name="standardDay"
            label={
              <Tooltip
                title={
                  <div className="text-justify">
                    <p>
                      Ngày công chuẩn là số ngày công hành chính trong tháng.
                    </p>
                    <p>
                      Ví dụ như một công ty có quy định là làm từ thứ 2 đến thứ
                      6 nghỉ thứ 7 và chủ nhật. chúng ta xét tháng 4 có 8 ngày
                      nghỉ nên có 22 ngày làm chính thức. Vậy số ngày công hành
                      chính trong tháng là 22 ngày.
                    </p>
                  </div>
                }
              >
                Ngày công chuẩn
              </Tooltip>
            }
            rules={[{ required: true }]}
          >
            <InputNumber className="w-full" placeholder="Ngày công chuẩn" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<SalaryTimeType>
            name="workDay"
            label="Số ngày làm"
            rules={[{ required: true }]}
          >
            <InputNumber
              className="w-full"
              placeholder="Số ngày làm việc thực tế"
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
