import { Button, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  fullname: string;
  vacationDays: number;
  reason: string;
  status: "pending" | "accept" | "refuse";
}

const columns: ColumnsType<DataType> = [
  { key: "fullname", title: "Tên NV", dataIndex: "fullname" },
  {
    key: "vacationDays",
    title: "Số ngày xin nghỉ",
    dataIndex: "vacationDays",
  },
  { key: "reason", title: "Lý do", dataIndex: "reason" },
  {
    key: "status",
    title: "Trạng thái",
    dataIndex: "status",
    render: (status: "pending" | "accept" | "refuse") => (
      <Tag
        color={
          status == "pending" ? "blue" : status == "accept" ? "green" : "red"
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
    key: "update",
    title: "Cập nhật",
    dataIndex: "update",
    render: () => (
      <Space>
        <Button className="bg-green-500 hover:!bg-green-600" type="primary">
          Chấp nhận
        </Button>
        <Button type="primary" danger>
          Từ chối
        </Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: 1,
    fullname: "John Brown",
    vacationDays: 32,
    reason: "New York No. 1 Lake Park",
    status: "accept",
  },
  {
    key: 2,
    fullname: "Jim Green",
    vacationDays: 42,
    reason: "London No. 1 Lake Park",
    status: "pending",
  },
  {
    key: 3,
    fullname: "Not Expandable",
    vacationDays: 29,
    reason: "Jiangsu No. 1 Lake Park",
    status: "refuse",
  },
  {
    key: 4,
    fullname: "Joe Black",
    vacationDays: 32,
    reason: "Sydney No. 1 Lake Park",
    status: "accept",
  },
];

export default function VacationPage() {
  return <Table columns={columns} dataSource={data} />;
}
