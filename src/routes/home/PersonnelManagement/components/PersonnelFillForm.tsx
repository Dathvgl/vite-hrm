import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  FloatButton,
  Form,
  Input,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { usePostPersonnelMutation } from "~/redux/personnel/personnelApi";
import { PersonnelRoleType, PersonnelType } from "~/types/personnel";

type FieldType = Omit<PersonnelType, "birth"> & {
  birth: dayjs.Dayjs;
};

const formatDayjs = "DD/MM/YYYY";
const roles: { name: string; role: PersonnelRoleType }[] = [
  {
    name: "Nhân viên",
    role: "staff",
  },
  { name: "Quản lý", role: "manager" },
];

export default function PersonnelFillForm() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [postPersonnel] = usePostPersonnelMutation();
  const [messageApi, contextHolder] = message.useMessage();

  function handleOk() {
    setOpen(false);
    form.resetFields();
  }

  async function onFinish(values: FieldType) {
    const data: PersonnelType = {
      ...values,
      birth: values.birth.format(formatDayjs),
      companies: [],
    };

    try {
      await postPersonnel(data).unwrap();

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
          <Row gutter={24}>
            <Col span={15}>
              <Form.Item<PersonnelType>
                label="Tên NV"
                name="fullname"
                rules={[{ required: true }]}
              >
                <Input placeholder="Tên nhân viên" />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item<PersonnelType>
                label="SĐT"
                name="phone"
                rules={[{ required: true }]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item<PersonnelType>
                label="Chức vụ"
                name="position"
                rules={[{ required: true }]}
              >
                <Input placeholder="Chức vụ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<PersonnelType>
                label="Phòng ban"
                name="department"
                rules={[{ required: true }]}
              >
                <Input placeholder="Phòng ban" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<PersonnelType>
            label="Địa chỉ"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Địa chỉ" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item<PersonnelType>
                label="Email"
                name="email"
                rules={[{ required: true }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<PersonnelType>
                label="Năm sinh"
                name="birth"
                rules={[{ required: true }]}
              >
                <DatePicker format={formatDayjs} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={16}>
              <Form.Item<PersonnelType>
                name="roles"
                label="Role"
                rules={[
                  {
                    required: true,
                    type: "array",
                    message: "Hãy phân quyền cho người này",
                  },
                ]}
              >
                <Select mode="multiple" placeholder="Phân quyền">
                  {roles.map((item) => (
                    <Select.Option key={item.role} value={item.role}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
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
