// src/components/ui/PaymentDialog.tsx
import React from 'react';
import { Dialog } from "@radix-ui/react-dialog"; // Ensure you're using Radix UI's Dialog
import { Button } from "./Button"; // Adjust the import based on your button component location

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md p-6 bg-white rounded-lg transform -translate-x-1/2 -translate-y-1/2">
        <Dialog.Title className="text-lg font-bold">Payment</Dialog.Title>
        <Dialog.Description className="mt-2 text-sm">
          {/* Add your payment form or details here */}
          <p>Please provide your payment information.</p>
          {/* Example input fields */}
          <input type="text" placeholder="Card Number" className="w-full border p-2 mt-4" />
          <input type="text" placeholder="Expiry Date" className="w-full border p-2 mt-2" />
          <input type="text" placeholder="CVV" className="w-full border p-2 mt-2" />
        </Dialog.Description>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => onOpenChange(false)} className="mr-2">Cancel</Button>
          <Button onClick={() => { /* Add payment processing logic */ onOpenChange(false); }}>Pay</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default PaymentDialog;
