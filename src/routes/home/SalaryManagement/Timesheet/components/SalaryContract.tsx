import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  InputNumber,
  Row,
  Space,
  Tooltip,
  message,
  theme,
} from "antd";
import { useState } from "react";
import { usePostSalaryContractMutation } from "~/redux/salary/salaryApi";
import { vndInput } from "~/utils/inputNumber";

type SalaryContractType = {
  base: number;
  percentage: number;
};

const today = new Date();

export default function SalaryContract({ id }: { id: string }) {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [salary, setSalary] = useState<number>();
  const [messageApi, contextHolder] = message.useMessage();

  const [postSalaryContract] = usePostSalaryContractMutation();

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  async function onFinish(values: { salaries: SalaryContractType[] }) {
    try {
      await postSalaryContract({
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
      {" "}
      {contextHolder}
      <Form
        form={form}
        name="salary-contract"
        style={formStyle}
        onFinish={onFinish}
        initialValues={{ salaries: [{ percentage: 90 }] }}
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
                    label={
                      <Tooltip
                        title={
                          <p className="text-justify">
                            Lương khoán là một hình thức trả lương căn cứ vào
                            khối lượng, chất lượng công việc và thời gian phải
                            hoàn thành được người sử dụng lao động vận dụng để
                            tính toán và trả tiền lương cho người lao động để họ
                            thực hiện công việc.
                          </p>
                        }
                      >
                        Mức lương khoán
                      </Tooltip>
                    }
                    rules={[{ required: true }]}
                  >
                    <InputNumber
                      className="w-full"
                      placeholder="Mức lương khoán"
                      {...vndInput}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    className="flex-1"
                    name={[name, "percentage"]}
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
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add({ percentage: 90 })}
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
