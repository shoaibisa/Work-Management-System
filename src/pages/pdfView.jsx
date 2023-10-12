

import React from 'react';

function PdfView() {
  const downloadPdf = () => {
    // Access the dynamic PDF endpoint from your Node.js server.
    const pdfUrl = 'http://localhost:3000/generate-pdf';

    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'dynamic.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div>
      <button onClick={downloadPdf}>Download Dynamic PDF</button>
    </div>
  );
}

export default PdfView;

