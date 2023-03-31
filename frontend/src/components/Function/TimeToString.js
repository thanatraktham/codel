const TimeToString = (date) => {
  let _hour = date.getHours();
  let _minute = date.getMinutes();

  let _hourStr = _hour.toString();
  let _minuteStr = _minute.toString();

  return (
    (_hour < 10 ? "0" + _hourStr : _hourStr) +
    ":" +
    (_minute < 10 ? "0" + _minuteStr : _minuteStr)
  );
};

export default TimeToString;
