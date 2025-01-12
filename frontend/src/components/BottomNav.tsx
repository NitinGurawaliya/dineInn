import { PhoneIcon, BanknoteIcon, ShareIcon } from 'lucide-react';
import { useState } from 'react';
import PaymentDialog from './PaymentDialog'; // Adjust the path as needed
import ShareDialog from './ShareDialog';

interface BottomNavProps {
  contact: string;
  upiQr: string; 
  link:string
}

const BottomNavbar: React.FC<BottomNavProps> = ({ contact, upiQr,link }) => {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const[isShareDialogOpen,setIsShareDialogOpen] = useState(false)

  return (
    <div className="fixed bottom-0 left-10 right-10 md:left-80 md:right-80 rounded-full bg-orange-900 flex justify-around items-center py-3 shadow-md z-10">
      <button 
        onClick={() => window.location.href = `tel:${contact}`}
        className="flex flex-col items-center text-white hover:opacity-80">
        <PhoneIcon size={24} />
        <span className="text-sm mt-1">Call</span>
      </button>
      <button
        onClick={() => setIsPaymentDialogOpen(true)} // Open the dialog
        className="flex flex-col items-center text-white hover:opacity-80">
        <BanknoteIcon size={33} />
        <span className="text-sm mt-1">Payment</span>
      </button>
      {/* <button className="flex flex-col items-center text-white hover:opacity-80">
        <MapPinIcon size={24} />
        <span className="text-sm mt-1">Navigate</span>
      </button> */}
      <button className="flex flex-col items-center text-white hover:opacity-80">
        <ShareIcon onClick={()=>{setIsShareDialogOpen(true)}} size={24} />
        <span className="text-sm mt-1">Share</span>
      </button>
      

      {/* Payment Dialog */}
      <PaymentDialog open={isPaymentDialogOpen} onClose={() => setIsPaymentDialogOpen(false)} upiQr={upiQr} />

      <ShareDialog link={link} open={isShareDialogOpen}  onClose={()=>{setIsShareDialogOpen(false)}}/>

    </div>
  );
};

export default BottomNavbar;
