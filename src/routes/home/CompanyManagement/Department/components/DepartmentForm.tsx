import { PlusOutlined } from "@ant-design/icons";
import { Button, FloatButton, Form, Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { usePostDepartmentMutation } from "~/redux/department/departmentApi";
import { DepartmentPostType } from "~/types/department";

export default function DepartmentForm() {
  const [postDepartment] = usePostDepartmentMutation();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  function handleOk() {
    setOpen(false);
    form.resetFields();
  }

  async function onFinish(values: DepartmentPostType) {
    try {
      await postDepartment(values).unwrap();

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
        title="Tạo phòng ban"
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
          <Form.Item<DepartmentPostType>
            label="Tên phỏng ban"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Tên phòng ban" />
          </Form.Item>
          <Form.Item<DepartmentPostType>
            label="Mô tả"
            name="description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} placeholder="Mô tả" />
          </Form.Item>
          <div className="text-right">
            <Button type="primary" htmlType="submit">
              Tạo phỏng ban
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
