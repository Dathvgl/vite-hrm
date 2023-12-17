import { Button, Flex, Table, message } from "antd";
import { useEffect } from "react";
import { useGetCompaniesQuery } from "~/redux/company/companyApi";
import {
  useGetPersonnelsQuery,
  usePutPersonnelCompaniesMutation,
} from "~/redux/personnel/personnelApi";
import { transferPersonnelCompany } from "~/redux/personnel/personnelSlice";
import { useAppDispatch, useAppSelector } from "~/redux/store";
import { TableType } from "~/types/base";

type TableCompanyType = TableType<{
  id: string;
  name: string;
}>;

export default function PersonnelCompany() {
  const transfer = useAppSelector((state) => state.personnelSlice.transfer);
  const dispatch = useAppDispatch();

  const { data: companies = [] } = useGetCompaniesQuery();
  const { data: personnels = [] } = useGetPersonnelsQuery();

  const [putPersonnelCompanies] = usePutPersonnelCompaniesMutation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const personnel = personnels.find((item) => item.id == transfer.personnel);

    if (personnel && personnel.companies.length != 0) {
      dispatch(transferPersonnelCompany(personnel.companies));
    }
  }, [transfer.personnel]);

  async function onUpdate() {
    try {
      await putPersonnelCompanies(transfer).unwrap();

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

  if (!transfer.personnel) return <></>;
  const personnel = personnels.find((item) => item.id == transfer.personnel);
  if (!personnel) return <></>;

  return (
    <Flex vertical gap={12}>
      {contextHolder}
      <Table<TableCompanyType>
        rowSelection={{
          type: "checkbox",
          selectedRowKeys: transfer.companies,
          onChange: (_: React.Key[], selectedRows: TableCompanyType[]) => {
            dispatch(
              transferPersonnelCompany(selectedRows.map(({ id }) => id))
            );
          },
        }}
        columns={[
          {
            title: "Danh sách công ty",
            dataIndex: "name",
            render: (text, record) => (
              <span
                className={
                  personnel.companies?.includes(record.id)
                    ? "font-bold text-green-500"
                    : undefined
                }
              >
                {text}
              </span>
            ),
          },
        ]}
        dataSource={companies.map((item) => ({
          key: item.id,
          id: item.id,
          name: item.name,
        }))}
        pagination={false}
      />
      <div className="text-right">
        <Button type="primary" onClick={onUpdate}>
          Cập nhật
        </Button>
      </div>
    </Flex>
  );
}
