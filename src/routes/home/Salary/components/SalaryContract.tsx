import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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

type SalaryContractType = {
  base: number;
  percentage: number;
};

export default function SalaryContract() {
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

  function onFinish(values: { salaries: SalaryContractType[] }) {
    const result = values.salaries.reduce((prev, curr) => {
      return prev + (curr.base * curr.percentage) / 100;
    }, 0);

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
                          Lương khoán là một hình thức trả lương căn cứ vào khối
                          lượng, chất lượng công việc và thời gian phải hoàn
                          thành được người sử dụng lao động vận dụng để tính
                          toán và trả tiền lương cho người lao động để họ thực
                          hiện công việc.
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
  );
}
