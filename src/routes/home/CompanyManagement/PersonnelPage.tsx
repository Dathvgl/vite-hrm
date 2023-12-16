import { Button, Col, Flex, Row } from "antd";
import Table, { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  stt: number;
  name: string;
  email: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "stt",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];

const data: DataType[] = [
  {
    key: "1",
    stt: 32,
    name: "John Brown",
    email: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    stt: 42,
    name: "Jim Green",
    email: "London No. 1 Lake Park",
  },
  {
    key: "3",
    stt: 32,
    name: "Joe Black",
    email: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    stt: 99,
    name: "Disabled User",
    email: "Sydney No. 1 Lake Park",
  },
];

export default function PersonnelPage() {
  return (
    <Row gutter={24}>
      <Col span={12}>
        <Table
          rowSelection={{
            type: "radio",
            onChange: (
              selectedRowKeys: React.Key[],
              selectedRows: DataType[]
            ) => {
              console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
              );
            },
          }}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </Col>
      <Col span={12}>
        <Flex vertical gap={12}>
          <Table<{ key: React.Key; name: string }>
            rowSelection={{
              type: "checkbox",
              onChange: (
                selectedRowKeys: React.Key[],
                selectedRows: { key: React.Key; name: string }[]
              ) => {
                console.log(
                  `selectedRowKeys: ${selectedRowKeys}`,
                  "selectedRows: ",
                  selectedRows
                );
              },
            }}
            columns={[{ title: "Danh sách công ty", dataIndex: "name" }]}
            dataSource={[
              { key: "1", name: "Fool Arcana" },
              { key: "2", name: "Magician Arcana" },
            ]}
            pagination={false}
          />
          <div className="text-right">
            <Button type="primary">Cập nhật</Button>
          </div>
        </Flex>
      </Col>
    </Row>
  );
}
