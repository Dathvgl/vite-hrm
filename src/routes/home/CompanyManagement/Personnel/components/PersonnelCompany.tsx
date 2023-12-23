import { Button, Flex, Table, message } from "antd";
import { useEffect } from "react";
import RoleBased from "~/components/RoleBased";
import { useGetCompanyAllQuery } from "~/redux/company/companyApi";
import { usePutPersonnelCompanyMutation } from "~/redux/personnel/personnelApi";
import {
  transferPersonnelCompany,
  transferPersonnelCompanyCurrent,
  transferPersonnelPersonnel,
} from "~/redux/personnel/personnelSlice";
import { useAppDispatch, useAppSelector } from "~/redux/store";
import { TableType } from "~/types/base";

type TableCompanyType = TableType<{
  id: string;
  name: string;
}>;

export default function PersonnelCompany() {
  const transfer = useAppSelector((state) => state.personnelSlice.transfer);
  const dispatch = useAppDispatch();

  const { data: companies = [] } = useGetCompanyAllQuery();

  const [putPersonnelCompany] = usePutPersonnelCompanyMutation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    return () => {
      dispatch(transferPersonnelPersonnel());
    };
  }, []);

  async function onUpdate() {
    try {
      await putPersonnelCompany(transfer).unwrap();

      messageApi.open({
        type: "success",
        content: "Cập nhật thành công",
      });

      if (transfer.company) {
        dispatch(transferPersonnelCompanyCurrent(transfer.company));
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Cập nhật thất bại",
      });
    }
  }

  if (!transfer.personnel) return <></>;

  return (
    <RoleBased includes={["boss", "admin"]}>
      {({ passed }) => (
        <Flex vertical gap={12}>
          {contextHolder}
          <Table<TableCompanyType>
            pagination={false}
            rowSelection={{
              type: "radio",
              selectedRowKeys: transfer.company
                ? [transfer.company]
                : undefined,
              onChange: (_: React.Key[], selectedRows: TableCompanyType[]) => {
                dispatch(transferPersonnelCompany(selectedRows[0].id));
              },
              getCheckboxProps: (_) => ({ disabled: !passed }),
            }}
            columns={[
              {
                title: "Danh sách công ty",
                dataIndex: "name",
                render: (text, record) => (
                  <span
                    className={
                      transfer.companyCurrent == record.id
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
          />
          {passed && (
            <div className="text-right">
              <Button type="primary" onClick={onUpdate}>
                Cập nhật
              </Button>
            </div>
          )}
        </Flex>
      )}
    </RoleBased>
  );
}
