import { ReloadOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import Table from "antd/es/table";
import usePersonnel from "~/hooks/usePersonnel";
import { useDeletePersonnelMutation } from "~/redux/personnel/personnelApi";
import { TableType } from "~/types/base";
import { PersonnelType } from "~/types/personnel";

export default function PersonnelList() {
  const { data = [], refetch } = usePersonnel();
  const [deletePersonnel] = useDeletePersonnelMutation();
  const [messageApi, contextHolder] = message.useMessage();

  async function onDelete(id: string) {
    try {
      await deletePersonnel(id).unwrap();

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

  return (
    <>
      {contextHolder}
      <Table<TableType<PersonnelType>>
        bordered
        scroll={{ x: 1200 }}
        pagination={{ pageSize: 5 }}
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
          { key: "fullname", title: "Họ tên NV", dataIndex: "fullname" },
          { key: "position", title: "Chức vụ", dataIndex: "position" },
          { key: "department", title: "Phòng ban", dataIndex: "department" },
          { key: "phone", title: "Số điện thoại", dataIndex: "phone" },
          { key: "birth", title: "Ngày sinh", dataIndex: "birth" },
          { key: "address", title: "Địa chỉ", dataIndex: "address" },
          { key: "email", title: "Email", dataIndex: "email" },
          {
            key: "actions",
            title: "Thao tác",
            dataIndex: "actions",
            width: 100,
            align: "center",
            fixed: "right",
            render: (_, { id }) => (
              <Button danger onClick={() => onDelete(id)}>
                Xóa
              </Button>
            ),
          },
        ]}
        dataSource={data.map((item, index) => ({
          ...item,
          key: index.toString(),
        }))}
      />
    </>
  );
}
