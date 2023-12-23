import { ReloadOutlined } from "@ant-design/icons";
import { Button, Table, message } from "antd";
import { useState } from "react";
import { useDeleteCompanyMutation } from "~/redux/company/companyApi";
import { useGetPositionsQuery } from "~/redux/position/positionApi";
import { TableType } from "~/types/base";
import { PositionsGetType } from "~/types/position";

export default function PositionList() {
  const [page, setPage] = useState<number>(1);
  const { data, refetch } = useGetPositionsQuery(page);
  const [deleteCompany] = useDeleteCompanyMutation();
  const [messageApi, contextHolder] = message.useMessage();

  async function onDelete(id: string) {
    try {
      await deleteCompany(id).unwrap();

      messageApi.open({
        type: "success",
        content: "Xóa thành công",
      });
    } catch (error) {
      console.error(error);

      messageApi.open({
        type: "error",
        content: "Xóa thất bại",
      });
    }
  }

  return (
    <>
      {contextHolder}
      <Table<TableType<PositionsGetType>>
        bordered
        pagination={{
          pageSize: 5,
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
          { key: "name", title: "Tên chức vụ", dataIndex: "name" },
          { key: "department", title: "Phòng ban", dataIndex: "department" },
          {
            key: "salary",
            title: "Lương cơ bản",
            dataIndex: "salary",
            render: (text) => (
              <>
                {`${Number.parseInt(`${text}`)
                  .toLocaleString()
                  .replaceAll(",", ".")} VND`}
              </>
            ),
          },
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
        dataSource={data?.data.map((item) => ({ ...item, key: item.stt }))}
      />
    </>
  );
}
