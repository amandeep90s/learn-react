import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DateRangeForm from "../components/DateRangeForm";

// Mock console.log
const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});

// Mock MaskedDatePicker to simplify testing form logic
jest.mock("../components/MaskedDatePicker", () => {
  return ({ onChange, value, id, placeholderText }) => (
    <input
      data-testid={id}
      id={id}
      placeholder={placeholderText}
      value={value ? value.toISOString().split("T")[0] : ""}
      onChange={(e) => {
        // Simulate selecting a date
        onChange(new Date(e.target.value));
      }}
    />
  );
});

describe("DateRangeForm Component", () => {
  beforeEach(() => {
    consoleLogSpy.mockClear();
  });

  test("renders form fields correctly", () => {
    render(<DateRangeForm />);

    expect(screen.getByText("Date Range Form")).toBeInTheDocument();
    expect(screen.getByLabelText("From Date:")).toBeInTheDocument();
    expect(screen.getByLabelText("To Date:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  test("validates required fields", async () => {
    render(<DateRangeForm />);

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("From Date is required")).toBeInTheDocument();
      expect(screen.getByText("To Date is required")).toBeInTheDocument();
    });
  });

  test("submits valid data", async () => {
    render(<DateRangeForm />);

    const fromDateInput = screen.getByTestId("fromDate");
    const toDateInput = screen.getByTestId("toDate");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    // Simulate picking dates (using YYYY-MM-DD for the mock input)
    fireEvent.change(fromDateInput, { target: { value: "2024-01-01" } });
    fireEvent.change(toDateInput, { target: { value: "2024-12-31" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(
        "Form Data:",
        expect.objectContaining({
          fromDate: expect.any(Date),
          toDate: expect.any(Date),
        })
      );
    });
  });
});
