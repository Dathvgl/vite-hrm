import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  FloatButton,
  Form,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useGetPersonnelsQuery } from "~/redux/personnel/personnelApi";
import { usePostVacationMutation } from "~/redux/vacation/vacationApi";
import { VacationType } from "~/types/vacation";

export default function VacationForm() {
  const { data = [] } = useGetPersonnelsQuery();
  const [postVacation] = usePostVacationMutation();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  function handleOk() {
    setOpen(false);
    form.resetFields();
  }

  async function onFinish(values: VacationType) {
    try {
      await postVacation({ ...values, status: "pending" }).unwrap();

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
        <Form form={form} autoComplete="off" onFinish={onFinish}>
          <Form.Item<VacationType>
            label="Tên NV"
            name="personnelId"
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
              options={data.map(({ id, fullname }) => ({
                value: id,
                label: fullname,
              }))}
            />
          </Form.Item>
          <Form.Item<VacationType>
            label="Lý do"
            name="reason"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} placeholder="Lý do xin nghỉ" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={16}>
              <Form.Item<VacationType>
                label="Số ngày xin nghỉ"
                name="offDays"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} placeholder="Số ngày" />
              </Form.Item>
            </Col>
            <Col className="text-center" span={8}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
