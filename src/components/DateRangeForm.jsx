import { useForm, Controller } from "react-hook-form";
import MaskedDatePicker from "./MaskedDatePicker";

const DateRangeForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fromDate: null,
      toDate: null,
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Date Range Form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            htmlFor="fromDate"
            style={{ display: "block", marginBottom: "5px" }}
          >
            From Date:
          </label>
          <Controller
            name="fromDate"
            control={control}
            rules={{ required: "From Date is required" }}
            render={({ field }) => (
              <MaskedDatePicker
                {...field}
                id="fromDate"
                selectsStart
                startDate={field.value}
                endDate={control._formValues.toDate}
              />
            )}
          />
          {errors.fromDate && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.fromDate.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="toDate"
            style={{ display: "block", marginBottom: "5px" }}
          >
            To Date:
          </label>
          <Controller
            name="toDate"
            control={control}
            rules={{ required: "To Date is required" }}
            render={({ field }) => (
              <MaskedDatePicker
                {...field}
                id="toDate"
                selectsEnd
                startDate={control._formValues.fromDate}
                endDate={field.value}
                minDate={control._formValues.fromDate}
              />
            )}
          />
          {errors.toDate && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.toDate.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DateRangeForm;
