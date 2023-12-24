import { Button, Calendar, message } from "antd";
import { SelectInfo } from "antd/es/calendar/generateCalendar";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  useGetTimesheetCurrentQuery,
  usePostTimesheetMutation,
  usePutTimesheetDayMutation,
} from "~/redux/timesheet/timesheetApi";
import { formatDayjs } from "~/utils/dayjs";

const today = new Date();

type TimeCalendarProps = {
  id: string;
  passed: boolean;
};

export default function TimeCalendar({ id, passed }: TimeCalendarProps) {
  const [messageApi, contextHolder] = message.useMessage();

  const [date, setDate] = useState<{ month: number; year: number }>({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });

  const { data, refetch } = useGetTimesheetCurrentQuery({ id, ...date });
  const [postTimesheet] = usePostTimesheetMutation();
  const [pustTimesheetDay] = usePutTimesheetDayMutation();

  const [dates, setDates] = useState<dayjs.Dayjs[]>([]);

  useEffect(() => {
    refetch();

    setDates(
      data?.days.map((item) =>
        dayjs(`${item}-${date.month}-${date.year}`, formatDayjs)
      ) ?? []
    );

    setDate({
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    });
  }, [id]);

  function onSelect(date: dayjs.Dayjs, selectInfo: SelectInfo) {
    if (!passed) return;
    if (selectInfo.source == "date") {
      const index = dates.findIndex((item) => item.isSame(date));
      const temp = [...dates];

      if (index !== -1) {
        temp.splice(index, 1);
      } else {
        temp.push(date);
      }

      setDates(temp);
    } else {
      setDates([]);

      setDate({
        month: date.month() + 1,
        year: date.year(),
      });
    }
  }

  async function onClick() {
    const dateNew = passed
      ? structuredClone(date)
      : {
          month: today.getMonth() + 1,
          year: today.getFullYear(),
        };

    const daysNew = passed
      ? dates.map((item) => item.date())
      : [today.getDate()];

    if (!data) {
      try {
        await postTimesheet({
          ...dateNew,
          personnel: id,
          days: daysNew,
        }).unwrap();

        messageApi.open({
          type: "success",
          content: "Tạo thành công",
        });

        refetch();
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "Tạo thất bại",
        });
      }
    } else {
      try {
        await pustTimesheetDay({ id: data.id, days: daysNew }).unwrap();

        messageApi.open({
          type: "success",
          content: "Cập nhật thành công",
        });

        refetch();
      } catch (error) {
        messageApi.open({
          type: "error",
          content: "Cập nhật thất bại",
        });
      }
    }
  }

  return (
    <>
      {contextHolder}
      <Calendar
        onSelect={onSelect}
        fullscreen={false}
        fullCellRender={(current) => {
          if (dates.some((item) => current.isSame(item, "date"))) {
            return (
              <div>
                <span className={"bg-blue-700 rounded-lg px-2 py-1"}>
                  {current.format("DD")}
                </span>
              </div>
            );
          }

          return <div>{current.format("DD")}</div>;
        }}
      />
      <div className="text-right">
        <Button
          disabled={passed ? false : data?.days.includes(today.getDate())}
          type="primary"
          onClick={onClick}
        >
          Chấm công
        </Button>
      </div>
    </>
  );
}
