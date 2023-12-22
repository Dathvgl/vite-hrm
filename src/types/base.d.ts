export type TableType<T> = T & {
  key: React.Key;
};

export type ReactFaCC<T> = (props: T) => JSX.Element;

export type OnlyChild = {
  children: React.ReactNode;
};

export type ListResult<T> = {
  totalAll: number;
  currentPage: number;
  data: T[];
};
