import { ReloadOutlined } from "@ant-design/icons";
import { Table } from "antd";
import usePersonnel from "~/hooks/usePersonnel";
import { transferPersonnelPersonnel } from "~/redux/personnel/personnelSlice";
import { useAppDispatch } from "~/redux/store";
import { TableType } from "~/types/base";

type TablePersonnelType = TableType<{
  id: string;
  name: string;
  email: string;
}>;

export default function PersonnelPersonnel() {
  const dispatch = useAppDispatch();
  const { data = [], refetch: personnelRefetch } = usePersonnel();

  return (
    <Table<TablePersonnelType>
      rowSelection={{
        type: "radio",
        onChange: (_: React.Key[], selectedRows: TablePersonnelType[]) => {
          dispatch(transferPersonnelPersonnel(selectedRows[0].id));
        },
      }}
      columns={[
        {
          key: "key",
          title: (
            <div className="flex justify-center items-center gap-3">
              <ReloadOutlined
                className="transition-all hover:rotate-180 hover:!text-cyan-500"
                onClick={personnelRefetch}
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
          title: "Email",
          dataIndex: "email",
        },
      ]}
      dataSource={data.map((item, index) => ({
        key: index,
        id: item.id,
        name: item.name,
        email: item.email,
      }))}
      pagination={{ pageSize: 5 }}
    />
  );
}
