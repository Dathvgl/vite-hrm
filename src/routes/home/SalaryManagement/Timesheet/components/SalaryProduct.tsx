import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  InputNumber,
  Row,
  Space,
  message,
  theme,
} from "antd";
import { useState } from "react";
import { usePostSalaryProductMutation } from "~/redux/salary/salaryApi";
import { vndInput } from "~/utils/inputNumber";

type SalaryProductType = {
  base: number;
  quantity: number;
};

const today = new Date();

export default function SalaryProduct({ id }: { id: string }) {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [salary, setSalary] = useState<number>();
  const [messageApi, contextHolder] = message.useMessage();

  const [postSalaryProduct] = usePostSalaryProductMutation();

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  async function onFinish(values: { salaries: SalaryProductType[] }) {
    try {
      await postSalaryProduct({
        ...values,
        id,
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
      }).unwrap();

      messageApi.open({
        type: "success",
        content: "Tạo thành công",
      });

      onClear();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Tạo thất bại",
      });
    }
  }

  function onClear() {
    form.resetFields();
    setSalary(undefined);
  }

  return (
    <>
      {contextHolder}
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
    </>
  );
}
