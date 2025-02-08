import { Link } from "react-router-dom";
import { Phone, MessageCircle, InstagramIcon } from "lucide-react";



const HomePageSkeleton = () => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-4 py-8">
      {/* Logo Section */}
      <div className="flex cursor-pointer flex-col items-center mb-6">
        <img  className="w-52 h-52 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56" />
      </div>

      {/* Welcome Text */}
      <h1 className="text-4xl font-bold mt-8 mb-12 text-center">
       
      </h1>

      {/* Social Icons */}
      <div className="flex justify-center gap-8 mb-12">
        <button className="text-black hover:opacity-75 transition-opacity">
          <InstagramIcon className="w-7 h-7" />
        </button>
        <button className="text-black hover:opacity-75 transition-opacity">
          <MessageCircle className="w-7 h-7" />
        </button>
        <Link to="#" className="text-black hover:opacity-75 transition-opacity">
          <Phone className="w-7 h-7" />
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-6 w-full max-w-md">
        <Link to="#" className="border-2 border-black px-8 py-4 text-center hover:bg-black hover:text-white transition-colors">
          VIEW DINE INN MENU
        </Link>
        <Link to="#" className="border-2 border-black px-8 py-4 text-center hover:bg-black hover:text-white transition-colors">
          RATE OUR RESTAURANT
        </Link>
      </div>
    </main>
  );
};

export default HomePageSkeleton;
