import { PlusOutlined } from "@ant-design/icons";
import { Button, FloatButton, Form, Modal, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import MultipleDatePicker from "~/components/MultiDatePicker";
import { useGetPersonnelAllQuery } from "~/redux/personnel/personnelApi";
import { usePostVacationMutation } from "~/redux/vacation/vacationApi";
import { VacationPostType } from "~/types/vacation";

// const disabledDate: RangePickerProps["disabledDate"] = (current) => {
//   return current && current < dayjs().endOf("day");
// };

export default function VacationForm() {
  const { data = [] } = useGetPersonnelAllQuery();
  const [postVacation] = usePostVacationMutation();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  function handleOk() {
    setOpen(false);
    form.resetFields();
  }

  async function onFinish(values: VacationPostType) {
    try {
      await postVacation({ ...values }).unwrap();

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
        title="Tạo nhân viên"
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
          <Form.Item<VacationPostType>
            label="Tên NV"
            name="personnel"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Chọn nhân viên"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={data.map(({ id, name: fullname }) => ({
                value: id,
                label: fullname,
              }))}
            />
          </Form.Item>
          <Form.Item<VacationPostType>
            label="Ngày xin nghỉ"
            name="offDays"
            rules={[{ required: true }]}
          >
            <MultipleDatePicker
              onChange={(value) => {
                form.setFieldsValue({ offDays: value });
              }}
            />
          </Form.Item>
          <Form.Item<VacationPostType>
            label="Lý do"
            name="reason"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} placeholder="Lý do xin nghỉ" />
          </Form.Item>
          <div className="text-right">
            <Button type="primary" htmlType="submit">
              Xin nghỉ
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
