import { ReloadOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useGetCompaniesQuery } from "~/redux/company/companyApi";
import { TableType } from "~/types/base";
import { CompanyType } from "~/types/company";

export default function CompanyList() {
  const { data = [], refetch } = useGetCompaniesQuery();

  return (
    <Table<TableType<CompanyType>>
      bordered
      scroll={{ x: 1200 }}
      pagination={{ pageSize: 5 }}
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
          width: 1,
          dataIndex: "key",
          align: "center",
          rowScope: "row",
          render: (text) => <div className="text-center">{text}</div>,
        },
        { key: "code", title: "Mã CTy", dataIndex: "code" },
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
