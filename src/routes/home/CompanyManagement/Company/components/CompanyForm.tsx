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
  message,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { usePostCompanyMutation } from "~/redux/company/companyApi";
import { CompanyPostType } from "~/types/company";
import { formatDayjs } from "~/utils/dayjs";

type FieldType = Omit<CompanyPostType, "constructionYear" | "operationYear"> & {
  constructionYear: dayjs.Dayjs;
  operationYear: dayjs.Dayjs;
};

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
    const data: CompanyPostType = {
      ...values,
      constructionYear: values.constructionYear.format(formatDayjs),
      operationYear: values.operationYear.format(formatDayjs),
    };

    try {
      await postCompany(data).unwrap();

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
        title="Tạo công ty"
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
          <Row gutter={24}>
            <Col span={15}>
              <Form.Item<CompanyPostType>
                labelCol={{ span: 10 }}
                label="Tên CTy"
                name="name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Tên công ty" />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item<CompanyPostType>
                labelCol={{ span: 10 }}
                label="Mã CTy"
                name="code"
                rules={[{ required: true }]}
              >
                <Input placeholder="Mã công ty" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<CompanyPostType>
            label="Địa chỉ"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Địa chỉ" />
          </Form.Item>
          <Row gutter={24}>
            <Col className="!pl-4" span={16}>
              <Form.Item<CompanyPostType>
                labelCol={{ span: 9 }}
                label="Năm xây dựng"
                name="constructionYear"
                rules={[{ required: true }]}
              >
                <DatePicker format={formatDayjs} />
              </Form.Item>
              <Form.Item<CompanyPostType>
                labelCol={{ span: 9 }}
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
            <Col className="flex justify-center items-center" span={8}>
              <Button type="primary" htmlType="submit">
                Tạo công ty
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
