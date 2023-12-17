import { Col, Row } from "antd";
import PersonnelCompany from "./components/PersonnelCompany";
import PersonnelPersonnel from "./components/PersonnelPersonnel";

export default function PersonnelPage() {
  return (
    <Row gutter={24}>
      <Col span={12}>
        <PersonnelPersonnel />
      </Col>
      <Col span={12}>
        <PersonnelCompany />
      </Col>
    </Row>
  );
}
