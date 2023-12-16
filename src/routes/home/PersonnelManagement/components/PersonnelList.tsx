import Table from "antd/es/table";

interface DataType {
  key: string;
  stt: number;
  fullname: string;
  position: string;
  department: string;
  phone: string;
  birth: string;
  address: string;
  email: string;
}

const data: Omit<DataType, "key">[] = [
  {
    stt: 0,
    fullname: "The Fool",
    position: "Nhân viên",
    department: "Phòng thường",
    phone: "0123456789",
    birth: "01/02/2001",
    address: "The Fool address is where long long long test",
    email: "fool@gmail.com",
  },
  {
    stt: 1,
    fullname: "The Magician",
    position: "Nhân viên",
    department: "Phòng thường",
    phone: "0987654321",
    birth: "02/03/2001",
    address: "The Magician address is where long long long test",
    email: "magician@gmail.com",
  },
  {
    stt: 2,
    fullname: "The Chariot",
    position: "Nhân viên",
    department: "Phòng thường",
    phone: "0159753456",
    birth: "03/04/2001",
    address: "The chariot address is where long long long test",
    email: "chariot@gmail.com",
  },
];

export default function PersonnelList() {
  return (
    <Table<DataType>
      bordered
      scroll={{ x: 1200 }}
      pagination={{ pageSize: 5 }}
      columns={[
        {
          key: "stt",
          title: "STT",
          dataIndex: "stt",
          render: (text) => <div className="text-center">{text}</div>,
        },
        { key: "fullname", title: "Họ tên NV", dataIndex: "fullname" },
        { key: "position", title: "Chức vụ", dataIndex: "position" },
        { key: "department", title: "Phòng ban", dataIndex: "department" },
        { key: "phone", title: "Số điện thoại", dataIndex: "phone" },
        { key: "birth", title: "Ngày sinh", dataIndex: "birth" },
        { key: "address", title: "Địa chỉ", dataIndex: "address" },
        { key: "email", title: "Email", dataIndex: "email" },
      ]}
      dataSource={data.map((item, index) => ({
        ...item,
        key: index.toString(),
      }))}
    />
  );
}
