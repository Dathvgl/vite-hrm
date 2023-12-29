import type { BaseQueryApi } from "@reduxjs/toolkit/query";
import { RootState } from "./store";

export function prepareHeadersCustom(
  headers: Headers,
  {
    getState,
  }: Pick<BaseQueryApi, "getState" | "extra" | "endpoint" | "type" | "forced">
) {
  const roles = (getState() as RootState).personnelSlice.user?.roles;

  if (roles) {
    headers.set("roles", roles.join("|"));
  }

  return headers;
}
