import { useGetPersonnelsQuery } from "~/redux/personnel/personnelApi";
import { useAppSelector } from "~/redux/store";

export default function usePersonnel() {
  const userFilter = useAppSelector((state) => state.personnelSlice.filter);
  const { data = [], ...rest } = useGetPersonnelsQuery();

  const personnels = data.filter((item) => {
    let isName = true;
    let isPosition = true;
    let isPhone = true;
    let isSelect = true;

    if (userFilter.name) {
      isName = item.name.includes(userFilter.name);
    }

    if (userFilter.position) {
      isPosition = item.position.includes(userFilter.position);
    }

    if (userFilter.phone) {
      isPhone = item.phone.includes(userFilter.phone);
    }

    if (userFilter.selection != "all") {
      isSelect = item.companies.includes(userFilter.selection);
    }

    return isName && isPosition && isPhone && isSelect;
  });

  return { ...rest, data: personnels };
}
