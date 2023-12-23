import { ReloadOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useState } from "react";
import { useGetPersonnelsQuery } from "~/redux/personnel/personnelApi";
import {
  transferPersonnelCompany,
  transferPersonnelCompanyCurrent,
  transferPersonnelPersonnel,
} from "~/redux/personnel/personnelSlice";
import { useAppDispatch, useAppSelector } from "~/redux/store";
import { ListResult, TableType } from "~/types/base";
import { PersonnelsGetCompany } from "~/types/personnel";

type TablePersonnelType = TableType<
  Pick<PersonnelsGetCompany, "id" | "name" | "email" | "company">
>;

export default function PersonnelPersonnel() {
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  const userSelect = useAppSelector(
    (state) => state.personnelSlice.filter.selection
  );

  const { data: dataQuery, refetch } = useGetPersonnelsQuery({
    page,
    type: "company",
    company: userSelect,
  });

  const data = dataQuery as ListResult<PersonnelsGetCompany> | undefined;

  return (
    <Table<TablePersonnelType>
      pagination={{
        total: data?.totalAll,
        onChange(page, _) {
          setPage(page);
        },
      }}
      rowSelection={{
        type: "radio",
        onChange: (_: React.Key[], selectedRows: TablePersonnelType[]) => {
          dispatch(transferPersonnelPersonnel(selectedRows[0].id));
          dispatch(transferPersonnelCompany(selectedRows[0].company));
          dispatch(transferPersonnelCompanyCurrent(selectedRows[0].company));
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
          render: (text) => <div className="text-center">{text}</div>,
        },
        {
          title: "Tên NV",
          dataIndex: "name",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
      ]}
      dataSource={data?.data.map((item) => ({
        key: item.stt,
        id: item.id,
        name: item.name,
        email: item.email,
        company: item.company,
      }))}
    />
  );
}
