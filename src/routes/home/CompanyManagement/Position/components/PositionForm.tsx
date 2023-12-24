import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  FloatButton,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  message,
} from "antd";
import { useState } from "react";
import { useGetDepartmentAllQuery } from "~/redux/department/departmentApi";
import { usePostPositionMutation } from "~/redux/position/positionApi";
import { PositionPostType } from "~/types/position";
import { vndInput } from "~/utils/inputNumber";

export default function PositionForm() {
  const { data = [], isSuccess } = useGetDepartmentAllQuery();
  const [postPosition] = usePostPositionMutation();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  function handleOk() {
    setOpen(false);
    form.resetFields();
  }

  async function onFinish(values: PositionPostType) {
    try {
      await postPosition(values).unwrap();

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
          <Form.Item<PositionPostType>
            label="Tên chức vụ"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Tên chức vụ" />
          </Form.Item>
          <Form.Item<PositionPostType>
            name="salary"
            label="Lương cứng"
            rules={[{ required: true }]}
          >
            <InputNumber className="w-full" placeholder="Lương" {...vndInput} />
          </Form.Item>
          <Form.Item<PositionPostType>
            name="allowance"
            label="Trợ cấp"
          >
            <InputNumber
              className="w-full"
              placeholder="Trợ cấp"
              {...vndInput}
            />
          </Form.Item>
          <Form.Item<PositionPostType>
            label="Phòng ban"
            name="department"
            rules={[{ required: true }]}
          >
            <Select disabled={!isSuccess} placeholder="Phòng ban">
              {data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div className="text-right">
            <Button type="primary" htmlType="submit">
              Tạo chức vụ
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
