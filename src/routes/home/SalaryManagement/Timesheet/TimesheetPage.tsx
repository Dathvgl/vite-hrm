import { ReloadOutlined } from "@ant-design/icons";
import { Col, Form, Input, InputNumber, Row, Select, theme } from "antd";
import { useEffect } from "react";
import RoleBased from "~/components/RoleBased";
import {
  useGetPersonnelAllQuery,
  useGetPersonnelOneQuery,
} from "~/redux/personnel/personnelApi";
import { useAppSelector } from "~/redux/store";
import { vndInput } from "~/utils/inputNumber";
import SalaryContract from "./components/SalaryContract";
import SalaryProduct from "./components/SalaryProduct";
import SalaryRevenue from "./components/SalaryRevenue";
import TimeCalendar from "./components/TimeCalendar";

export default function TimesheetPage() {
  const {
    token: { colorText },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [formInfo] = Form.useForm();

  const current: string | undefined = Form.useWatch("personnel", form);
  const id = useAppSelector((state) => state.personnelSlice.user?.id);

  const { data: personnels = [], refetch: personnelsRefetch } =
    useGetPersonnelAllQuery();

  const { data: personnel } = useGetPersonnelOneQuery(current, {
    skip: current == undefined,
  });

  useEffect(() => {
    if (current && personnel) {
      console.log(personnel?.name);
      formInfo.setFieldsValue(personnel);
    }
  }, [current, personnel]);

  return (
    <RoleBased includes={["boss", "admin"]}>
      {({ passed }) => {
        return (
          <>
            <Row gutter={24}>
              <Col span={12}>
                <Form
                  name="filter-needed"
                  form={form}
                  initialValues={passed ? undefined : { personnel: id }}
                >
                  <Form.Item
                    name="personnel"
                    label={
                      <div className="flex justify-center items-center gap-3">
                        <ReloadOutlined
                          className="transition-all hover:rotate-180 hover:!text-cyan-500"
                          onClick={personnelsRefetch}
                        />
                        <span>Nhân viên</span>
                      </div>
                    }
                  >
                    <Select
                      showSearch
                      placeholder="Chọn nhân viên"
                      optionFilterProp="children"
                      disabled={!passed}
                      listHeight={120}
                      filterOption={(input, option) => {
                        return (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }}
                      options={personnels?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                    />
                  </Form.Item>
                </Form>
                {personnel && (
                  <Form
                    form={formInfo}
                    disabled
                    labelCol={{ span: 4 }}
                    name="info-personnel"
                  >
                    <Form.Item label="Tên NV" name="name">
                      <Input bordered={false} />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input bordered={false} />
                    </Form.Item>
                    <Form.Item label="Phòng ban" name="department">
                      <Input bordered={false} />
                    </Form.Item>
                    <Form.Item label="Chức vụ" name="position">
                      <Input bordered={false} />
                    </Form.Item>
                    {personnel.salary && (
                      <Form.Item label="Lương CB" name="salary">
                        <InputNumber
                          className="w-full"
                          bordered={false}
                          {...vndInput}
                        />
                      </Form.Item>
                    )}
                  </Form>
                )}
              </Col>
              <Col span={12}>
                {personnel &&
                  (personnel.company == "" ? (
                    <div className="flex justify-center items-center h-full">
                      <strong style={{ color: colorText }}>
                        Nhân viên chưa được vào công ty
                      </strong>
                    </div>
                  ) : (
                    <TimeCalendar id={personnel.id} passed={passed} />
                  ))}
              </Col>
            </Row>
            {personnel?.salaryType && personnel.company != "" && (
              <>
                {personnel.salaryType == "revenue" ? (
                  <SalaryRevenue id={personnel.id} />
                ) : personnel.salaryType == "contract" ? (
                  <SalaryContract id={personnel.id} />
                ) : personnel.salaryType == "product" ? (
                  <SalaryProduct id={personnel.id} />
                ) : undefined}
              </>
            )}
          </>
        );
      }}
    </RoleBased>
  );
}
