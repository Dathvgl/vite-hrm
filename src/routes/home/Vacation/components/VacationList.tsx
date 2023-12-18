import { ReloadOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag, message } from "antd";
import usePersonnel from "~/hooks/usePersonnel";
import {
  useGetVacationsQuery,
  usePutVacationStatusMutation,
} from "~/redux/vacation/vacationApi";
import { TableType } from "~/types/base";
import { VacationStatusType, VacationType } from "~/types/vacation";

export default function VacationList() {
  const [messageApi, contextHolder] = message.useMessage();
  const { data: personnels } = usePersonnel();
  const { data: vacations = [], refetch } = useGetVacationsQuery();
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
        columns={[
          {
            key: "personnelId",
            title: (
              <div className="flex justify-center items-center gap-3">
                <ReloadOutlined
                  className="transition-all hover:rotate-180 hover:!text-cyan-500"
                  onClick={refetch}
                />
                <span>Tên NV</span>
              </div>
            ),
            dataIndex: "personnelId",
            render: (id) => {
              const personnel = personnels?.find((item) => item.id == id);
              return <>{personnel?.fullname}</>;
            },
          },
          {
            key: "offDays",
            title: "Số ngày xin nghỉ",
            dataIndex: "offDays",
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
              <Space>
                <Button
                  className={
                    record.status != "pending"
                      ? undefined
                      : "bg-green-500 hover:!bg-green-600"
                  }
                  type="primary"
                  disabled={!(record.status == "pending")}
                  onClick={() => onAction(record.id, "accept")}
                >
                  Chấp nhận
                </Button>
                <Button
                  type="primary"
                  danger
                  disabled={!(record.status == "pending")}
                  onClick={() => onAction(record.id, "refuse")}
                >
                  Từ chối
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={vacations.map((item) => ({ ...item, key: item.id }))}
      />
    </>
  );
}
