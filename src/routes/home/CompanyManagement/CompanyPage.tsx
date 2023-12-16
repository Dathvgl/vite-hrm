import { Table } from "antd";

interface DataType {
  key: string;
  stt: number;
  id: string;
  name: string;
  address: string;
  operationYear: string;
  constructionYear: string;
}

const data: Omit<DataType, "key">[] = [
  {
    stt: 0,
    id: "TFA",
    name: "Fool Arcana",
    address: "The Fool address is where long long long test",
    constructionYear: "01/02/2001",
    operationYear: "01/02/2001",
  },
  {
    stt: 1,
    id: "TMA",
    name: "Magician Arcana",
    address: "The Magician address is where long long long test",
    constructionYear: "02/03/2001",
    operationYear: "02/03/2001",
  },
  {
    stt: 2,
    id: "TCA",
    name: "Chariot Arcana",
    address: "The chariot address is where long long long test",
    constructionYear: "03/04/2001",
    operationYear: "03/04/2001",
  },
];

export default function CompanyPage() {
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
        { key: "id", title: "Mã CTy", dataIndex: "id" },
        { key: "name", title: "Tên CTy", dataIndex: "name" },
        { key: "address", title: "Địa chỉ", dataIndex: "address" },
        {
          key: "constructionYear",
          title: "Năm xây dựng",
          dataIndex: "constructionYear",
        },
        {
          key: "operationYear",
          title: "Năm vận hành",
          dataIndex: "operationYear",
        },
      ]}
      dataSource={data.map((item, index) => ({
        ...item,
        key: index.toString(),
      }))}
    />
  );
}
