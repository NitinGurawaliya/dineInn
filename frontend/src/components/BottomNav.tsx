import { PhoneIcon, BanknoteIcon, MapPinIcon, ShareIcon } from 'lucide-react';

interface BottomNavProps{
  contact:string;
}

const BottomNavbar:React.FC<BottomNavProps> = ({contact}) => {
  return (
    <div className="fixed bottom-0 left-10 right-10 md:left-80 md:right-80 rounded-full  bg-black flex justify-around items-center py-3 shadow-md z-1000">
      <button 
      onClick={() => window.location.href = `tel:${contact}`}
       className="flex flex-col items-center text-black hover:opacity-80">
        <PhoneIcon size={24} />
        <span className="text-sm mt-1">Call</span>
      </button>
      <button className="flex flex-col items-center text-black hover:opacity-80">
        <BanknoteIcon size={24} />
        <span className="text-sm mt-1">Payment</span>
      </button>
      <button className="flex flex-col items-center text-black hover:opacity-80">
        <MapPinIcon size={24} />
        <span className="text-sm mt-1">Navigate</span>
      </button>
      <button className="flex flex-col items-center text-black hover:opacity-80">
        <ShareIcon size={24} />
        <span className="text-sm mt-1">Share</span>
      </button>
    </div>
  );
};

export default BottomNavbar;
