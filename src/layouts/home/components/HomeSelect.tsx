import { Select } from "antd";
import { useGetCompaniesQuery } from "~/redux/company/companyApi";
import { companySelect } from "~/redux/company/companySlice";
import { useAppDispatch, useAppSelector } from "~/redux/store";

export default function HomeSelect() {
  const { data = [] } = useGetCompaniesQuery();

  const selection = useAppSelector((state) => state.companySlice.selection);
  const dispatch = useAppDispatch();

  function onChange(value: string) {
    dispatch(companySelect(value));
  }

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      className="w-[200px]"
      showSearch
      placeholder="Chọn công ty"
      optionFilterProp="children"
      onChange={onChange}
      filterOption={filterOption}
      value={selection}
      options={[
        {
          value: "all",
          label: "Tất cả",
        },
        ...data.map((item) => ({ value: item.id, label: item.name })),
      ]}
    />
  );
}
