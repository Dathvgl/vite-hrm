import { ReloadOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import { useState } from "react";
import {
  useDeletePersonnelMutation,
  useGetPersonnelsQuery,
} from "~/redux/personnel/personnelApi";
import { useAppSelector } from "~/redux/store";
import { ListResult, TableType } from "~/types/base";
import { PersonnelsGetManagement } from "~/types/personnel";

export default function PersonnelList() {
  const [page, setPage] = useState<number>(1);
  const userFilter = useAppSelector((state) => state.personnelSlice.filter);

  const { data: dataQuery, refetch } = useGetPersonnelsQuery({
    page,
    type: "management",
    ...userFilter,
  });

  const data = dataQuery as ListResult<PersonnelsGetManagement> | undefined;

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
      <Table<TableType<PersonnelsGetManagement>>
        scroll={{ x: 1200 }}
        pagination={{
          total: data?.totalAll,
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
          { key: "name", title: "Họ tên NV", dataIndex: "name" },
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
              <Button disabled danger onClick={() => onDelete(id)}>
                Xóa
              </Button>
            ),
          },
        ]}
        dataSource={data?.data.map((item) => ({
          ...item,
          key: item.stt,
        }))}
      />
    </>
  );
}
