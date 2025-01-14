import { PhoneIcon, BanknoteIcon, ShareIcon } from 'lucide-react';

const BlogSkeleton = () => {
  return (
    <div className="animate-pulse min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Logo Placeholder */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-gray-300 rounded-full"></div>
        </div>

        {/* Restaurant Name Placeholder */}
        <div className="h-8 md:h-10 bg-gray-300 rounded-md mx-auto mb-4 md:mb-6 w-2/3"></div>

        {/* Location Placeholder */}
        <div className="h-6 bg-gray-300 rounded-md mx-auto mb-8 w-1/2"></div>

        {/* Menu Grid Placeholder */}
        <div className="grid grid-cols-1 m-5 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300"
              >
                <div className="relative w-full pt-[141.4%] bg-gray-200 rounded-t-lg"></div>
                <div className="p-4 bg-gray-200">
                  <div className="h-5 bg-gray-300 rounded-md mx-auto w-3/4"></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom Navbar Placeholder */}
      <div className="fixed bottom-0 left-10 right-10 md:left-80 md:right-80 rounded-full bg-gray-300 flex justify-around items-center py-3 shadow-md z-10">
        <div className="flex flex-col items-center text-gray-500">
          <PhoneIcon size={24} />
          <span className="text-sm mt-1">Call</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <BanknoteIcon size={33} />
          <span className="text-sm mt-1">Payment</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <ShareIcon size={24} />
          <span className="text-sm mt-1">Share</span>
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
