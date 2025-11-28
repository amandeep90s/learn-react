import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import PDFPreview from "./PDFPreview";

// Mock react-pdf globally (defined in src/__mocks__/react-pdf.js)
jest.mock("react-pdf");

describe("PDFPreview Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test("renders without crashing with valid file prop", () => {
    render(<PDFPreview file="/sample.pdf" />);
    expect(screen.getByTestId("mock-document")).toBeInTheDocument();
  });

  test("displays error message when no file is provided", () => {
    render(<PDFPreview file={null} />);
    expect(screen.getByText("No PDF file provided")).toBeInTheDocument();
  });

  test("displays loading state initially", () => {
    render(<PDFPreview file="/sample.pdf" />);
    expect(screen.getByText("Loading PDF...")).toBeInTheDocument();
  });

  test("displays page controls after PDF loads", async () => {
    render(<PDFPreview file="/sample.pdf" />);

    await waitFor(() => {
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
  });

  test("renders first page by default", async () => {
    render(<PDFPreview file="/sample.pdf" />);

    await waitFor(() => {
      expect(screen.getByTestId("mock-page-1")).toBeInTheDocument();
    });
  });

  test("previous button is disabled on first page", async () => {
    render(<PDFPreview file="/sample.pdf" />);

    await waitFor(() => {
      const prevButton = screen.getByLabelText("Previous page");
      expect(prevButton).toBeDisabled();
    });
  });

  test("next button is enabled on first page when there are multiple pages", async () => {
    render(<PDFPreview file="/sample.pdf" />);

    await waitFor(() => {
      const nextButton = screen.getByLabelText("Next page");
      expect(nextButton).not.toBeDisabled();
    });
  });

  test("navigates to next page when next button is clicked", async () => {
    render(<PDFPreview file="/sample.pdf" />);

    await waitFor(() => {
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    const nextButton = screen.getByLabelText("Next page");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    });
  });

  test("navigates to previous page when previous button is clicked", async () => {
    render(<PDFPreview file="/sample.pdf" />);

    // Wait for PDF to load
    await waitFor(() => {
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    // Go to page 2
    const nextButton = screen.getByLabelText("Next page");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    });

    // Go back to page 1
    const prevButton = screen.getByLabelText("Previous page");
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });
  });

  test("next button is disabled on last page", async () => {
    render(<PDFPreview file="/sample.pdf" />);

    await waitFor(() => {
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    // Navigate to last page
    const nextButton = screen.getByLabelText("Next page");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(nextButton).toBeDisabled();
    });
  });

  test("uses custom width prop", async () => {
    render(<PDFPreview file="/sample.pdf" width={800} />);

    await waitFor(() => {
      expect(screen.getByText(/width: 800/)).toBeInTheDocument();
    });
  });

  test("uses default width when not specified", async () => {
    render(<PDFPreview file="/sample.pdf" />);

    await waitFor(() => {
      expect(screen.getByText(/width: 600/)).toBeInTheDocument();
    });
  });

  test("handles empty string file prop", () => {
    render(<PDFPreview file="" />);
    expect(screen.getByText("No PDF file provided")).toBeInTheDocument();
  });

  test("displays correct page numbers throughout navigation", async () => {
    render(<PDFPreview file="/sample.pdf" />);

    // Start at page 1
    await waitFor(() => {
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    // Navigate to page 2
    fireEvent.click(screen.getByLabelText("Next page"));
    await waitFor(() => {
      expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    });

    // Navigate back to page 1
    fireEvent.click(screen.getByLabelText("Previous page"));
    await waitFor(() => {
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });
  });
});
