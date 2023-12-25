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
import { useGetDepartmentAllQuery } from "~/redux/department/departmentApi";
import { usePostPersonnelMutation } from "~/redux/personnel/personnelApi";
import { useGetPositionAllQuery } from "~/redux/position/positionApi";
import { PersonnelPostType } from "~/types/personnel";
import { formatDayjs } from "~/utils/dayjs";

type FieldType = Omit<PersonnelPostType, "birth"> & {
  birth: dayjs.Dayjs;
};

export default function PersonnelFillForm() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { data: departments = [], isSuccess: isDepartment } =
    useGetDepartmentAllQuery();

  const department: string | undefined = Form.useWatch("department", form);

  const { data: positions = [] } = useGetPositionAllQuery(department, {
    skip: department == undefined,
  });

  const [postPersonnel] = usePostPersonnelMutation();

  function handleOk() {
    setOpen(false);
    form.resetFields();
  }

  async function onFinish(values: FieldType) {
    const data: PersonnelPostType = {
      ...values,
      birth: values.birth.format(formatDayjs),
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
        <Form
          labelCol={{ span: 10 }}
          form={form}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item<PersonnelPostType>
                label="Tên NV"
                name="name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Tên nhân viên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<PersonnelPostType>
                label="Số ĐT"
                name="phone"
                rules={[
                  { required: true, len: 10 },
                  { pattern: new RegExp(/^0/g), message: "SĐT bắt đầu từ 0" },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<PersonnelPostType>
            className="pl-5"
            labelCol={{ span: 4 }}
            label="Ph. ban"
            name="department"
            rules={[{ required: true }]}
          >
            <Select disabled={!isDepartment} placeholder="Phòng ban">
              {departments.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item<PersonnelPostType>
            className="pl-5"
            labelCol={{ span: 4 }}
            label="Chức vụ"
            name="position"
            rules={[{ required: true }]}
          >
            <Select disabled={positions.length == 0} placeholder="Chức vụ">
              {positions?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item<PersonnelPostType>
            className="pl-5"
            labelCol={{ span: 4 }}
            label="Địa chỉ"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Địa chỉ" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item<PersonnelPostType>
                label="Email"
                name="email"
                rules={[{ required: true }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<PersonnelPostType>
                label="Năm sinh"
                name="birth"
                rules={[{ required: true }]}
              >
                <DatePicker format={formatDayjs} />
              </Form.Item>
            </Col>
          </Row>
          <div className="text-right">
            <Button type="primary" htmlType="submit">
              Tạo nhân viên
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
