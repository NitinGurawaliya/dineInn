// src/components/PaymentDialog.tsx
import React from "react";
import { FaCopy } from "react-icons/fa"; // Importing the copy icon from React Icons

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  link: string; 
}

const ShareDialog: React.FC<PaymentDialogProps> = ({ open, onClose, link }) => {
  if (!open) return null; // Don't render if not open

  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link); // Copy link to clipboard
      alert("Link copied to clipboard!"); // Alert user
    } catch (err) {
      console.error("Failed to copy: ", err); // Log error if copy fails
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 w-80">
        <h2 className="text-lg font-bold text-center">Copy Link</h2>

        <div className="text-center bg-gray-100 rounded-lg p-3 mt-2 mb-4">
          <span className="font-medium">{link}</span>
          <FaCopy 
            className="inline-block ml-8 text-blue-500 cursor-pointer" 
            title="Copy Link"
            onClick={copyLinkToClipboard} // Copy link on icon click
          />
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-red-500 text-white rounded px-4 py-2">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareDialog;
