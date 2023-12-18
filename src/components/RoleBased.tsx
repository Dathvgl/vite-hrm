import { useAppSelector } from "~/redux/store";
import { ReactFaCC } from "~/types/base";
import { PersonnelRoleType } from "~/types/personnel";

type RoleBasedProps = {
  includes?: PersonnelRoleType[];
  excludes?: PersonnelRoleType[];
  children: ReactFaCC<{ passed: boolean }>;
};

export default function RoleBased({
  includes,
  excludes,
  children,
}: RoleBasedProps) {
  const roles = useAppSelector((state) => state.personnelSlice.user?.roles);

  return children?.({
    passed:
      (roles?.some((item) => includes?.includes(item)) &&
        !roles?.some((item) => excludes?.includes(item))) ??
      false,
  });
}
