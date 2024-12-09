import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { BACKEND_URL } from "../config";
import BottomNavbar from "./BottomNav";

interface MenuItem {
  id: number;
  title: string;
  imageUrl: string;
  userId: number;
}

const RestaurantMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { id } = useParams();

  async function resMenu() {
    const res = await axios.get(`${BACKEND_URL}/api/v1/restaurant/${id}`);
    setMenuItems(res.data.menus);
    setRestaurantName(res.data.resName.restaurantName);
    setLocation(res.data.resName.City);
    setContact(res.data.resName.ContactNum);
  }

  useEffect(() => {
    resMenu();
  }, []);

  const openFullscreen = (index: number) => {
    setCurrentImageIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % menuItems.length
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + menuItems.length) % menuItems.length
    );
  };

  return (
    <div>
      <div className="min-h-screen bg-white p-4 md:p-b-4">
        <div className="max-w-6xl mx-auto">
          {/* Restaurant Name */}
          <h1 className="text-4xl md:text-4xl font-extrabold text-center mb-4 md:mb-6 text-orange-800 font-serif drop-shadow-lg">
            {restaurantName.toUpperCase()}
          </h1>

          <h1 className="text-xl md:text-2xl md:mb-4 font-extrabold text-center text-black font-serif drop-shadow-lg">
            📍 {location.toUpperCase()}
          </h1>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105"
                onClick={() => openFullscreen(index)} // Open fullscreen on click
              >
                {/* Image */}
                <div className="relative w-full pt-[141.4%] bg-gradient-to-t from-orange-100 via-amber-50 to-white">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute top-0 left-0 w-full h-full object-contain rounded-t-lg"
                  />
                </div>

                {/* Title */}
                <div className="p-4 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 text-center truncate">
                    {item.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {isFullscreen && menuItems.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={closeFullscreen}
          >
            ✖
          </button>
          <button
            className="absolute left-4 text-white text-4xl font-bold"
            onClick={handlePreviousImage}
          >
            ◀
          </button>
          <img
            src={menuItems[currentImageIndex].imageUrl}
            alt={menuItems[currentImageIndex].title}
            className="max-w-full max-h-full object-contain"
          />
          <button
            className="absolute right-4 text-white text-4xl font-bold"
            onClick={handleNextImage}
          >
            ▶
          </button>
        </div>
      )}

      <Footer />
      <BottomNavbar contact={contact} />
    </div>
  );
};

export default RestaurantMenu;
