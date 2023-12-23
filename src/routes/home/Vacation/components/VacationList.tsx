import { ReloadOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag, message } from "antd";
import { useState } from "react";
import RoleBased from "~/components/RoleBased";
import {
  useGetVacationsQuery,
  usePutVacationStatusMutation,
} from "~/redux/vacation/vacationApi";
import { TableType } from "~/types/base";
import { VacationStatusType, VacationType } from "~/types/vacation";

export default function VacationList() {
  const [page, setPage] = useState<number>(1);
  const [messageApi, contextHolder] = message.useMessage();

  const { data, refetch } = useGetVacationsQuery(page);
  const [putVacationStatus] = usePutVacationStatusMutation();

  async function onAction(id: string, status: VacationStatusType) {
    try {
      await putVacationStatus({ id, status }).unwrap();

      messageApi.open({
        type: "success",
        content: "Cập nhật thành công",
      });
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
      <Table<TableType<VacationType>>
        pagination={{
          total: data?.totalAll,
          onChange(page, _) {
            setPage(page);
          },
        }}
        columns={[
          {
            key: "personnel",
            title: (
              <div className="flex justify-center items-center gap-3">
                <ReloadOutlined
                  className="transition-all hover:rotate-180 hover:!text-cyan-500"
                  onClick={refetch}
                />
                <span>Tên NV</span>
              </div>
            ),
            dataIndex: "personnel",
          },
          {
            key: "offDays",
            title: "Ngày xin nghỉ",
            dataIndex: "offDays",
            render: (list: string[]) => (
              <>
                {list.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </>
            ),
          },
          { key: "reason", title: "Lý do", dataIndex: "reason" },
          {
            key: "status",
            title: "Trạng thái",
            dataIndex: "status",
            render: (status: VacationStatusType) => (
              <Tag
                color={
                  status == "pending"
                    ? "blue"
                    : status == "accept"
                    ? "green"
                    : "red"
                }
              >
                {status == "pending"
                  ? "Đang chờ"
                  : status == "accept"
                  ? "Chấp nhận"
                  : "Từ chối"}
              </Tag>
            ),
          },
          {
            key: "actions",
            title: "Thao tác",
            dataIndex: "actions",
            render: (_, record) => (
              <RoleBased includes={["boss"]}>
                {({ passed }) => {
                  const check = !(record.status == "pending") || !passed;

                  return (
                    <Space>
                      <Button
                        className={
                          check ? undefined : "bg-green-500 hover:!bg-green-600"
                        }
                        type="primary"
                        disabled={check}
                        onClick={() => onAction(record.id, "accept")}
                      >
                        Chấp nhận
                      </Button>
                      <Button
                        type="primary"
                        danger
                        disabled={check}
                        onClick={() => onAction(record.id, "refuse")}
                      >
                        Từ chối
                      </Button>
                    </Space>
                  );
                }}
              </RoleBased>
            ),
          },
        ]}
        dataSource={data?.data.map((item) => ({
          ...item,
          key: item.id,
        }))}
      />
    </>
  );
}
