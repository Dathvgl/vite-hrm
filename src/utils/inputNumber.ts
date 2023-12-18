import { InputNumberProps } from "antd";

export const vndInput: InputNumberProps = {
  formatter: (value) => `${value} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, "."),
  parser: (value) =>
    Number.parseInt(value?.replace(" VND", "").replaceAll(".", "") ?? "0") ?? 0,
  onClick: (event) =>
    event.currentTarget.setSelectionRange(
      event.currentTarget.value.length - 4,
      event.currentTarget.value.length - 4
    ),
};
