// src/components/PaymentDialog.tsx
import React from "react";

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  upiQr: string; 
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ open, onClose, upiQr }) => {
  if (!open) return null; // Don't render if not open

  const saveToGallery = () => {
    if (!upiQr) {
      alert("QR code not available."); // Alert if QR code is not available
      return;
    }

    // Create a new Image object
    const img = new Image();
    img.src = upiQr;
    img.crossOrigin = "Anonymous"; // Allow cross-origin access

    img.onload = () => {
      // Create a canvas to draw the image
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);

        // Convert the canvas to a data URL and download
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob); // Create a URL for the Blob
            link.download = "restaurant-qr-code.png"; // Filename to save
            document.body.appendChild(link);
            link.click(); // Simulate click to download
            document.body.removeChild(link); // Clean up
          } else {
            alert("Could not create Blob from image.");
          }
        });
      }
    };

    img.onerror = () => {
      alert("Failed to load QR code image.");
    };
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 w-80">
        <h2 className="text-lg font-bold text-center">Payment</h2>
        <p className="text-center">Scan the QR code to make a payment:</p>

        {/* Display the QR code image */}
        {upiQr && (
          <div className="flex flex-col items-center mt-4">
            <img src={upiQr} alt="QR Code" className="w-32 h-32 mb-2" />
            <button
              onClick={saveToGallery}
              className="bg-blue-500 text-white rounded px-4 py-2 mt-2"
            >
              Save to Gallery
            </button>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-red-500 text-white rounded px-4 py-2">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDialog;
