import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./PDFPreview.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFPreview = ({ file, width = 600 }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    setError("Failed to load PDF file");
    console.error("PDF load error:", error);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  if (!file) {
    return <div className="pdf-preview-error">No PDF file provided</div>;
  }

  return (
    <div className="pdf-preview-container">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<div className="pdf-preview-loading">Loading PDF...</div>}
      >
        <Page
          pageNumber={pageNumber}
          width={width}
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      </Document>

      {error && <div className="pdf-preview-error">{error}</div>}

      {numPages && !error && (
        <div className="pdf-preview-controls">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="pdf-preview-button"
            aria-label="Previous page"
          >
            Previous
          </button>
          <span className="pdf-preview-page-info">
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="pdf-preview-button"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFPreview;
