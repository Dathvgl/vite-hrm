import { Calendar, Select, Tag } from "antd";
import dayjs from "dayjs";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { useCallback, useState } from "react";
import { formatDayjs } from "~/utils/dayjs";

type MultipleDatePickerProps = {
  onChange?: (value: string[]) => void;
};

export default function MultipleDatePicker({
  onChange,
}: MultipleDatePickerProps) {
  const [dates, setDates] = useState<dayjs.Dayjs[]>([]);

  const tagRender = useCallback(
    ({ value, onClose }: CustomTagProps) => {
      return (
        <Tag closable onClose={onClose}>
          {value}
        </Tag>
      );
    },
    [formatDayjs]
  );

  return (
    <Select
      mode="tags"
      value={dates.map((item) => item.format(formatDayjs))}
      popupMatchSelectWidth={false}
      onDeselect={(oldSelect) => {
        setDates(dates.filter((item) => item.format(formatDayjs) != oldSelect));
      }}
      tagRender={tagRender}
      dropdownRender={() => {
        return (
          <div className="w-[300px]">
            <Calendar
              onSelect={(selected) => {
                const index = dates.findIndex((item) => item.isSame(selected));
                const temp = [...dates];

                if (index !== -1) {
                  temp.splice(index, 1);
                } else {
                  temp.push(selected);
                }

                onChange?.(temp.map((item) => item.format(formatDayjs)));
                setDates(temp);
              }}
              fullscreen={false}
              fullCellRender={(current) => {
                if (dates.some((item) => current.isSame(item))) {
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
          </div>
        );
      }}
    />
  );
}
