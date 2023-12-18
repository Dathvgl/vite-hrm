export type TableType<T> = T & {
  key: React.Key;
};

export type ReactFaCC<T> = (props: T) => JSX.Element;
