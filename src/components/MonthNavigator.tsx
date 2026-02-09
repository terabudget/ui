import { Calendar } from "primereact/calendar";
import { useRef, useState } from "react";

import "./MonthNavigator.css";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { format } from "date-fns";

interface Props {
  className?: string;
}

export const MonthNavigator = ({ className }: Props) => {
  const [date, doSetDate] = useState<Date>(new Date());
  const op = useRef<OverlayPanel>(null);

  const dateDisplay = format(date, "do MMM yyyy");

  const setDate = (newDate: Date | undefined | null) => {
    if (newDate) {
      doSetDate(newDate);
    }
    op.current?.hide();
  };

  return (
    <div className="budget-month-navigator card flex flex-column align-items-center gap-3">
      <Button
        type="button"
        className={className}
        onClick={(e) => op?.current && op.current.toggle(e)}
        label={dateDisplay}
      />
      <OverlayPanel ref={op} closeOnEscape>
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value)}
          inline
          showButtonBar
          dateFormat="MM yy"
          className="m-5"
        />
      </OverlayPanel>
      {/* </div> */}
    </div>
  );
};
