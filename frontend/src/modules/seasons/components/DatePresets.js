import React from "react";
import moment from "moment";
const DatePresets = (props) => {
  const { startDate, endDate, showDateFormat, handlePresets } = props;
  const today = moment();
  const presets = [
    {
      text: "Next Week",
      start: today,
      end: moment().add(1, "week"),
    },
    {
      text: "Next Month",
      start: today,
      end: moment().add(1, "month"),
    },
    {
      text: "Next 3 Months",
      start: today,
      end: moment().add(3, "month"),
    },
  ];
  return (
    <div className="p-3">
      {presets.map(({ text, start, end }) => {
        const isChosen =
          moment(start).format(showDateFormat) ===
            moment(startDate).format(showDateFormat) &&
          moment(end).format(showDateFormat) ===
            moment(endDate).format(showDateFormat);
        return (
          <button
            key={text}
            type="button"
            className={`btn btn-sm btn-dark ${
              isChosen ? "btn-success" : "btn-danger"
            }`}
            style={{ marginRight: 12 }}
            onClick={() => handlePresets(start, end)}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};
export default DatePresets;