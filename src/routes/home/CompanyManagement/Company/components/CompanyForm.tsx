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
  message
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { usePostCompanyMutation } from "~/redux/company/companyApi";
import { CompanyType } from "~/types/company";

type FieldType = Omit<CompanyType, "constructionYear" | "operationYear"> & {
  constructionYear: dayjs.Dayjs;
  operationYear: dayjs.Dayjs;
};

const formatDayjs = "DD/MM/YYYY";

export default function CompanyForm() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [postCompany] = usePostCompanyMutation();
  const [messageApi, contextHolder] = message.useMessage();

  function handleOk() {
    setOpen(false);
    form.resetFields();
  }

  async function onFinish(values: FieldType) {
    const data: CompanyType = {
      ...values,
      constructionYear: values.constructionYear.format(formatDayjs),
      operationYear: values.operationYear.format(formatDayjs),
    };

    try {
      const result = await postCompany(data).unwrap();

      messageApi.open({
        type: "success",
        content: result,
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
        title="Tạo công ty"
        onOk={handleOk}
        onCancel={() => setOpen(false)}
        footer={false}
      >
        <Form form={form} autoComplete="off" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={15}>
              <Form.Item<CompanyType>
                label="Tên CTy"
                name="name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Tên công ty" />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item<CompanyType>
                label="Mã CTy"
                name="code"
                rules={[{ required: true }]}
              >
                <Input placeholder="Mã công ty" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<CompanyType>
            label="Địa chỉ"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Địa chỉ" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={13}>
              <Form.Item<CompanyType>
                label="Năm xây dựng"
                name="constructionYear"
                rules={[{ required: true }]}
              >
                <DatePicker format={formatDayjs} />
              </Form.Item>
              <Form.Item<CompanyType>
                label="Năm vận hành"
                name="operationYear"
                rules={[
                  { required: true },
                  {
                    validator: async (_, end) => {
                      const start = form.getFieldValue("constructionYear");
                      if (start != null)
                        if (end <= start) {
                          return Promise.reject(
                            "Năm vận hành lớn hơn năm xây dựng"
                          );
                        }
                    },
                  },
                ]}
              >
                <DatePicker format={formatDayjs} />
              </Form.Item>
            </Col>
            <Col className="flex justify-center items-center" span={11}>
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
