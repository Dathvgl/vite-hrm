import { ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Modal,
  Row,
  Select,
  Table,
  Tag
} from "antd";
import { useState } from "react";
import { useGetCalculatorsQuery } from "~/redux/calculator/calculatorApi";
import { useGetDepartmentAllQuery } from "~/redux/department/departmentApi";
import { useAppSelector } from "~/redux/store";
import { TableType } from "~/types/base";
import { CalculatorSalaryType } from "~/types/calculator";

export default function CalculatorPage() {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<TableType<CalculatorSalaryType>>();

  const [page, setPage] = useState<number>(1);
  const [date, setDate] = useState<{ month: number; year: number }>();

  const department: string | undefined = Form.useWatch("department", form);
  const userSelection = useAppSelector(
    (state) => state.personnelSlice.filter.selection
  );

  const { data, refetch } = useGetCalculatorsQuery(
    {
      page,
      month: date?.month,
      year: date?.year,
      department,
      company: userSelection,
    },
    { skip: date?.month == undefined || date?.year == undefined }
  );

  const { data: departments = [] } = useGetDepartmentAllQuery();

  function onClick(record: TableType<CalculatorSalaryType>) {
    setOpen(true);
    setRecord(record);
  }

  function onCancel() {
    setOpen(false);
    setRecord(undefined);
  }

  return (
    <>
      <Modal centered open={open} onCancel={onCancel} footer={false}>
        {record && <InfoModal record={record} />}
      </Modal>
      <Form form={form}>
        <Row gutter={24}>
          <Col>
            <Form.Item label="Thời gian tính" name="date">
              <DatePicker
                picker="month"
                onChange={(value) =>
                  setDate(
                    value
                      ? { month: value.month() + 1, year: value.year() }
                      : undefined
                  )
                }
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              className="w-[300px]"
              label="Phòng ban"
              name="department"
            >
              <Select placeholder="Phòng ban">
                <Select.Option value="all">Tất cả</Select.Option>
                {departments.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table<TableType<CalculatorSalaryType>>
        scroll={{ x: 1200 }}
        pagination={{
          total: data?.totalAll,
          onChange(page, _) {
            setPage(page);
          },
        }}
        columns={[
          {
            key: "key",
            title: (
              <div className="flex justify-center items-center gap-3">
                <ReloadOutlined
                  className="transition-all hover:rotate-180 hover:!text-cyan-500"
                  onClick={refetch}
                />
                <span>STT</span>
              </div>
            ),
            width: 80,
            dataIndex: "key",
            align: "center",
            rowScope: "row",
            render: (text) => <div className="text-center">{text}</div>,
          },
          { key: "name", title: "Họ tên NV", dataIndex: "name" },
          { key: "position", title: "Chức vụ", dataIndex: "position" },
          { key: "department", title: "Phòng ban", dataIndex: "department" },
          {
            key: "salaryBase",
            title: "Lương cơ bản",
            dataIndex: "salaryBase",
            render: (text) => (
              <>
                {`${Number.parseInt(`${text ?? 0}`)
                  .toLocaleString()
                  .replaceAll(",", ".")} VND`}
              </>
            ),
          },
          {
            key: "salaryCalc",
            title: "Lương nhận",
            dataIndex: "salaryCalc",
            render: (text) => (
              <>
                {`${Number.parseInt(`${text ?? 0}`)
                  .toLocaleString()
                  .replaceAll(",", ".")} VND`}
              </>
            ),
          },
          {
            key: "salaryBonus",
            title: "Lương thưởng",
            dataIndex: "salaryBonus",
            render: (text) => (
              <>
                {`${Number.parseInt(`${text ?? 0}`)
                  .toLocaleString()
                  .replaceAll(",", ".")} VND`}
              </>
            ),
          },
          {
            key: "info",
            title: "Thông tin",
            dataIndex: "info",
            render: (_, record) => (
              <Button onClick={() => onClick(record)}>Xem</Button>
            ),
          },
        ]}
        dataSource={data?.data.map((item) => ({
          ...item,
          key: item.stt,
        }))}
      />
    </>
  );
}

function InfoModal({ record }: { record: TableType<CalculatorSalaryType> }) {
  return (
    <>
      <div>{record.salaryTypeName}</div>
      {record.vacations && (
        <ul className="px-0">
          Số ngày nghỉ:{" "}
          {record.vacations.map((item, index) => (
            <Tag key={index}>{item}</Tag>
          ))}
        </ul>
      )}
      {record.salaryAllowance
        ? record.salaryAllowance > 0 && (
            <div>
              Phụ cấp:{" "}
              {record.salaryAllowance.toLocaleString().replaceAll(",", ".")} VND
            </div>
          )
        : undefined}
      {record.salaryType == "time" ? (
        <div>
          Số ngày làm: <Tag>{record.info.days.length}</Tag>
        </div>
      ) : record.salaryType == "revenue" ? (
        <ul className="px-0">
          {record.info.salaries.map((item, index) => (
            <li key={index} className="flex items-end justify-between">
              <div>
                Doanh thu: {item.revenue.toLocaleString().replaceAll(",", ".")}{" "}
                VND
              </div>
              <div>Lợi ích: {item.percentage}%</div>
            </li>
          ))}
        </ul>
      ) : record.salaryType == "contract" ? (
        <ul className="px-0">
          {record.info.salaries.map((item, index) => (
            <li key={index} className="flex items-end justify-between">
              <div>
                Mức khoán: {item.base.toLocaleString().replaceAll(",", ".")} VND
              </div>
              <div>Lợi ích: {item.percentage}%</div>
            </li>
          ))}
        </ul>
      ) : record.salaryType == "product" ? (
        <ul className="px-0">
          {record.info.salaries.map((item, index) => (
            <li key={index} className="flex items-end justify-between">
              <div>
                Đơn giá: {item.base.toLocaleString().replaceAll(",", ".")} VND
              </div>
              <div>
                Số lượng: {item.quantity.toLocaleString().replaceAll(",", ".")}
              </div>
            </li>
          ))}
        </ul>
      ) : undefined}
    </>
  );
}
