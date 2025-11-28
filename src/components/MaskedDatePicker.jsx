import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import MaskedInput from "react-maskedinput";
import "react-datepicker/dist/react-datepicker.css";

// Custom input component using MaskedInput
const DateMaskInput = forwardRef(({ onChange, ...props }, ref) => (
  <MaskedInput
    {...props}
    ref={ref}
    mask="11/11/1111"
    placeholder="DD/MM/YYYY"
    onChange={onChange}
  />
));

const MaskedDatePicker = ({ value, onChange, ...props }) => {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      customInput={<DateMaskInput />}
      placeholderText="DD/MM/YYYY"
      strictParsing
      {...props}
    />
  );
};

export default MaskedDatePicker;
