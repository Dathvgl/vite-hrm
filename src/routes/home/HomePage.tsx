import { Empty } from "antd";

export default function HomePage() {
  return (
    <Empty className="h-full [&_.ant-empty-image]:h-full" description={false} />
  );
}
