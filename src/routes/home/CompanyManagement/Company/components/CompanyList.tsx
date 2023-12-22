import { ReloadOutlined } from "@ant-design/icons";
import { Button, Table, message } from "antd";
import { useState } from "react";
import {
  useDeleteCompanyMutation,
  useGetCompaniesQuery,
} from "~/redux/company/companyApi";
import { TableType } from "~/types/base";
import { CompaniesGetType } from "~/types/company";

export default function CompanyList() {
  const [page, setPage] = useState<number>(1);
  const { data, refetch } = useGetCompaniesQuery(page);
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
      messageApi.open({
        type: "error",
        content: "Xóa thất bại",
      });
    }
  }

  return (
    <>
      {contextHolder}
      <Table<TableType<CompaniesGetType>>
        bordered
        scroll={{ x: 1200 }}
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
