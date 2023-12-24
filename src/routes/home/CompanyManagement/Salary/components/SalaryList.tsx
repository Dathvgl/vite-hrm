import { ReloadOutlined } from "@ant-design/icons";
import { Button, Table, message } from "antd";
import { useState } from "react";
import {
  useDeleteSalaryMutation,
  useGetSalariesQuery,
} from "~/redux/salary/salaryApi";
import { TableType } from "~/types/base";
import { SalariesGetType } from "~/types/salary";
import { capitalize } from "~/utils/convert";

export default function SalaryList() {
  const [page, setPage] = useState<number>(1);
  const { data, refetch } = useGetSalariesQuery(page);
  const [deleteSalary] = useDeleteSalaryMutation();
  const [messageApi, contextHolder] = message.useMessage();

  async function onDelete(id: string) {
    try {
      await deleteSalary(id).unwrap();

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
      <Table<TableType<SalariesGetType>>
        bordered
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
          { key: "name", title: "Tên lương", dataIndex: "name" },
          {
            key: "type",
            title: "Kiểu lương",
            dataIndex: "type",
            render: (text) => <>{capitalize(text)}</>,
          },
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
        dataSource={data?.data.map((item) => ({ ...item, key: item.stt }))}
      />
    </>
  );
}
