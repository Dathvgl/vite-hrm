import { Button, Col, Form, Input, Row, Space, theme } from "antd";
import {
  PersonnelFilterSearch,
  userFilterSearch,
} from "~/redux/personnel/personnelSlice";
import { useAppDispatch } from "~/redux/store";

export default function PersonnelSearchForm() {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  function onFinish(values: PersonnelFilterSearch) {
    for (const [key, value] of Object.entries(values)) {
      if (value == "") {
        values[key as keyof typeof values] = undefined;
      }
    }

    dispatch(userFilterSearch(values));
  }

  function onClear() {
    form.resetFields();
    dispatch(userFilterSearch({}));
  }

  return (
    <Form
      className="p-[24px] rounded-lg border border-solid border-slate-300"
      style={{ background: token.colorFillAlter }}
      autoComplete="off"
      form={form}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item<PersonnelFilterSearch> name="name" label="Tên NV">
            <Input placeholder="Tên nhân viên" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<PersonnelFilterSearch> name="phone" label="Số ĐT">
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item<PersonnelFilterSearch> name="position" label="Chức vụ">
            <Input placeholder="Chức vụ" />
          </Form.Item>
        </Col>
        <Col className="text-right" span={12}>
          <Space size="small">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button onClick={onClear}>Clear</Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}
