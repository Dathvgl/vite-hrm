import { ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
  usePutDepartmentMutation,
} from "~/redux/department/departmentApi";
import { useGetSalaryAllQuery } from "~/redux/salary/salaryApi";
import { TableType } from "~/types/base";
import { DepartmentPutType, DepartmentsGetType } from "~/types/department";

export default function DepartmentList() {
  const [current, setCurrent] = useState<string>();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(1);

  const { data: departmentQuery, refetch } = useGetDepartmentsQuery(page);
  const [messageApi, contextHolder] = message.useMessage();

  const { data: salaries = [], isSuccess } = useGetSalaryAllQuery();
  const [form] = Form.useForm();

  const [putDepartment] = usePutDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  async function onUpdate(id: string) {
    setOpen(true);
    setCurrent(id);
  }

  async function onDelete(id: string) {
    try {
      await deleteDepartment(id).unwrap();

      messageApi.open({
        type: "success",
        content: "Xóa thành công",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Xóa thất bại",
      });
    }
  }

  function handleOk() {
    setOpen(false);
    setCurrent(undefined);
    form.resetFields();
  }

  function onCancel() {
    setOpen(false);
    setCurrent(undefined);
    form.resetFields();
  }

  async function onFinish(values: DepartmentPutType) {
    if (!current) return;

    Object.keys(values).forEach((key) => {
      const item = values[key as keyof typeof values];

      if (!item || item == "") {
        delete values[key as keyof typeof values];
      }
    });

    if (Object.keys(values).length == 0) return;

    try {
      await putDepartment({ ...values, id: current }).unwrap();

      messageApi.open({
        type: "success",
        content: "Cập nhật thành công",
      });

      handleOk();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Cập nhật thất bại",
      });
    }
  }

  return (
    <>
      {contextHolder}
      <Modal
        centered
        open={open}
        title="Cập nhật phòng ban"
        onOk={handleOk}
        onCancel={onCancel}
        footer={false}
      >
        <Form
          labelCol={{ span: 6 }}
          form={form}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item<DepartmentPutType> label="Tên phòng ban" name="name">
            <Input placeholder="Tên phòng ban" />
          </Form.Item>
          <Form.Item<DepartmentPutType> label="Kiểu lương" name="salary">
            <Select disabled={!isSuccess} placeholder="Lương">
              {salaries.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item<DepartmentPutType> label="Mô tả" name="description">
            <TextArea rows={4} placeholder="Mô tả" />
          </Form.Item>
          <div className="text-right">
            <Button type="primary" htmlType="submit">
              Cập nhật phòng ban
            </Button>
          </div>
        </Form>
      </Modal>
      <Table<TableType<DepartmentsGetType>>
        bordered
        pagination={{
          total: departmentQuery?.totalAll,
          onChange(page, _) {
            setPage(page);
          },
        }}
        columns={[
          {
            key: "key",
            title: (
              <div className="flex justify-center items-center gap-3">
                <ReloadOutlined
                  className="transition-all hover:rotate-180 hover:!text-cyan-500"
                  onClick={refetch}
                />
                <span>STT</span>
              </div>
            ),
            width: 80,
            dataIndex: "key",
            align: "center",
            rowScope: "row",
            render: (text) => <div className="text-center">{text}</div>,
          },
          { key: "name", title: "Tên phòng ban", dataIndex: "name" },
          { key: "salary", title: "Tên lương", dataIndex: "salary" },
          { key: "description", title: "Mô tả", dataIndex: "description" },
          {
            key: "actions",
            title: "Thao tác",
            dataIndex: "actions",
            width: 100,
            align: "center",
            fixed: "right",
            render: (_, { id }) => (
              <Space>
                <Button type="primary" onClick={() => onUpdate(id)}>
                  Sửa
                </Button>
                <Button disabled danger onClick={() => onDelete(id)}>
                  Xóa
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={departmentQuery?.data.map((item) => ({
          ...item,
          key: item.stt,
        }))}
      />
    </>
  );
}
