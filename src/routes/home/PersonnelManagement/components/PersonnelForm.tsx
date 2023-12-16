import { Button, Col, Form, Input, Row, Select, Space, theme } from "antd";

type FieldType = {
  personnel?: string;
  position?: string;
  phone?: string;
};

export default function PersonnelForm() {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  function onFinish(values: FieldType) {
    console.log("Received values of form: ", values);
  }

  return (
    <Form
      className="p-[24px] rounded-lg border border-solid border-slate-300"
      style={{ background: token.colorFillAlter }}
      form={form}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item<FieldType> name="personnel" label="Tên NV">
            <Input placeholder="Tên nhân viên" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldType> name="phone" label="Số ĐT">
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item<FieldType> name="position" label="Chức vụ">
            <Select placeholder="Chức vụ">
              <Select.Option value="1">Giám đốc</Select.Option>
              <Select.Option value="2">Tạp vụ</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col className="text-right" span={12}>
          <Space size="small">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button onClick={() => form.resetFields()}>Clear</Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}
