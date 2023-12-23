import { ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Modal,
  Row,
  Table,
  Tag,
  message,
} from "antd";
import { useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import {
  useGetPersonnelsQuery,
  usePutPersonnelRoleMutation,
} from "~/redux/personnel/personnelApi";
import { useGetRolesQuery } from "~/redux/role/roleApi";
import { useAppSelector } from "~/redux/store";
import { ListResult, TableType } from "~/types/base";
import { PersonnelsGetRoles } from "~/types/personnel";
import { capitalize, strToHex } from "~/utils/convert";

type TablePersonnelType = TableType<
  Pick<PersonnelsGetRoles, "id" | "name" | "roles">
>;

export default function PersonnelRolePage() {
  const [current, setCurrent] = useState<string>();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(1);

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { data: roles = [] } = useGetRolesQuery();
  const [putPersonnelRole] = usePutPersonnelRoleMutation();

  const userSelect = useAppSelector(
    (state) => state.personnelSlice.filter.selection
  );

  const { data: dataQuery, refetch } = useGetPersonnelsQuery({
    page,
    type: "role",
    company: userSelect,
  });

  const data = dataQuery as ListResult<PersonnelsGetRoles> | undefined;

  useEffect(() => {
    if (current) {
      const array: string[] = [];

      const list = data?.data.find((item) => item.id == current)?.roles ?? [];

      list.forEach((item) => {
        const result = roles.find(({ name }) => name == item);
        if (result) array.push(result.id);
      });

      form.setFieldsValue({ roles: array });
    }
  }, [current]);

  function handleOk() {
    setOpen(false);
    setCurrent(undefined);
  }

  function onCancel() {
    setOpen(false);
    setCurrent(undefined);
  }

  async function onFinish(values: { roles: string[] }) {
    if (!current) return;

    try {
      await putPersonnelRole({ id: current, roles: values.roles }).unwrap();

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
        title="Cập nhật phân quyền"
        onOk={handleOk}
        onCancel={onCancel}
        footer={false}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item className="mb-0" name="roles" label="Quyền">
            <Checkbox.Group className="w-full pl-4">
              <Row>
                {roles.map((item) => (
                  <Col key={item.id} span={8}>
                    <Checkbox value={item.id}>{capitalize(item.name)}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <div className="text-right">
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </div>
        </Form>
      </Modal>
      <Table<TablePersonnelType>
        pagination={{
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
            render: (text) => <div className="text-center">{text}</div>,
          },
          {
            title: "Tên NV",
            dataIndex: "name",
          },
          {
            title: "Quyền hạn",
            dataIndex: "roles",
            render: (roles: string[]) => {
              return (
                <>
                  {roles.map((item) => {
                    const color = strToHex(item);

                    return (
                      <Tag
                        key={item}
                        color={strToHex(item)}
                        style={{
                          color: tinycolor(color).isDark() ? "white" : "black",
                        }}
                      >
                        {capitalize(item)}
                      </Tag>
                    );
                  })}
                </>
              );
            },
          },
          {
            key: "actions",
            title: "Thao tác",
            dataIndex: "actions",
            width: 100,
            align: "center",
            fixed: "right",
            render: (_, { id }) => (
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true);
                  setCurrent(id);
                }}
              >
                Sửa
              </Button>
            ),
          },
        ]}
        dataSource={data?.data.map((item) => ({
          key: item.stt,
          id: item.id,
          name: item.name,
          roles: item.roles,
        }))}
      />
    </>
  );
}
