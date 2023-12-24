import { PlusOutlined } from "@ant-design/icons";
import { Button, FloatButton, Form, Input, Modal, Select, message } from "antd";
import { useState } from "react";
import { usePostSalaryMutation } from "~/redux/salary/salaryApi";
import { SalaryPostType, SalaryTypeType } from "~/types/salary";
import { capitalize } from "~/utils/convert";

const salaryTypes: SalaryTypeType[] = [
  "time",
  "revenue",
  "contract",
  "product",
  "bonus",
];

export default function SalaryForm() {
  const [postSalary] = usePostSalaryMutation();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  function handleOk() {
    setOpen(false);
    form.resetFields();
  }

  async function onFinish(values: SalaryPostType) {
    try {
      await postSalary(values).unwrap();

      messageApi.open({
        type: "success",
        content: "Tạo thành công",
      });

      handleOk();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Tạo thất bại",
      });
    }
  }

  return (
    <>
      {contextHolder}
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setOpen(true)}
      />
      <Modal
        centered
        open={open}
        title="Tạo lương"
        onOk={handleOk}
        onCancel={() => setOpen(false)}
        footer={false}
      >
        <Form
          labelCol={{ span: 6 }}
          form={form}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item<SalaryPostType>
            label="Tên lương"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Tên lương" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Kiểu lương"
            rules={[{ required: true }]}
          >
            <Select placeholder="Phòng ban">
              {salaryTypes.map((item) => (
                <Select.Option key={item} value={item}>
                  {capitalize(item)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div className="text-right">
            <Button type="primary" htmlType="submit">
              Tạo lương
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
