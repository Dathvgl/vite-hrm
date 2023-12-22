import { Select } from "antd";
import { useGetCompanyAllQuery } from "~/redux/company/companyApi";
import { userFilterSelect } from "~/redux/personnel/personnelSlice";
import { useAppDispatch, useAppSelector } from "~/redux/store";

export default function HomeSelect() {
  const { data = [] } = useGetCompanyAllQuery();

  const selection = useAppSelector(
    (state) => state.personnelSlice.filter.selection
  );

  const dispatch = useAppDispatch();

  function onChange(value: string) {
    dispatch(userFilterSelect(value));
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
