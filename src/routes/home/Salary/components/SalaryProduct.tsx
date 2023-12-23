import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, InputNumber, Row, Space, theme } from "antd";
import { useState } from "react";
import { initSalary } from "~/redux/salary/salarySlice";
import { useAppDispatch } from "~/redux/store";
import { vndInput } from "~/utils/inputNumber";

type SalaryProductType = {
  base: number;
  quantity: number;
};

export default function SalaryProduct() {
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

  function onFinish(values: { salaries: SalaryProductType[] }) {
    const result = values.salaries.reduce((prev, curr) => {
      return prev + curr.base * curr.quantity;
    }, 0);

    const salary = Math.ceil(result / 1000) * 1000
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
      name="salary-product"
      style={formStyle}
      onFinish={onFinish}
    >
      <Form.List name="salaries">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className="flex items-baseline gap-4">
                <Form.Item
                  {...restField}
                  className="flex-1"
                  name={[name, "base"]}
                  label="Đơn giá"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    className="w-full"
                    placeholder="Đơn giá sản phẫm"
                    {...vndInput}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  className="flex-1"
                  name={[name, "quantity"]}
                  label="Số lượng"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    className="w-full"
                    min={0 as number}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    }
                    parser={(value) =>
                      Number.parseInt(value?.replaceAll(".", "") ?? "0") ?? 0
                    }
                    onClick={(event) =>
                      event.currentTarget.setSelectionRange(
                        event.currentTarget.value.length - 1,
                        event.currentTarget.value.length - 1
                      )
                    }
                  />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Thêm mục
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

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
