import { Calendar } from "primereact/calendar";
import { useState } from "react";

export const MonthNavigator = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <>
      <Calendar
        inline
        value={date}
        onChange={(e) => setDate(e.value)}
        view="month"
        dateFormat="MM yy"
      />
    </>
  );
};
