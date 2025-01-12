## Date Range Picker

```tsx
<DayPicker
  numberOfMonths={2}
  pagedNavigation
  showOutsideDays
  locale={localeID}
  required
  mode="range"
  classNames={{
    chevron: "datepicker-chevron",
    range_start: "datepicker-range_start",
    range_middle: "datepicker-range_middle",
    range_end: "datepicker-range_end",
    today: "datepicker-today",
    selected: "datepicker-selected",
  }}
  showWeekNumber={false}
  selected={{ from: state.dateStart, to: state.dateEnd }}
  onSelect={({ from, to }) => {
    setState({
      dateStart: from,
      dateEnd: to,
    });
  }}
  footer={null}
/>
```
