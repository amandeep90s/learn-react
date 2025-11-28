export const pdfjs = {
  GlobalWorkerOptions: {
    workerSrc: "",
  },
  version: "3.11.174",
};

export const Document = ({
  children,
  onLoadSuccess,
  onLoadError,
  loading,
  file,
}) => {
  // Simulate successful load after a brief delay
  if (file) {
    setTimeout(() => {
      if (onLoadSuccess) {
        onLoadSuccess({ numPages: 2 });
      }
    }, 100);
  } else if (onLoadError) {
    setTimeout(() => {
      onLoadError(new Error("No file provided"));
    }, 100);
  }

  return (
    <div data-testid="mock-document">
      {loading}
      {children}
    </div>
  );
};

export const Page = ({ pageNumber, width }) => (
  <div data-testid={`mock-page-${pageNumber}`}>
    Page {pageNumber} (width: {width})
  </div>
);
