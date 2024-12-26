import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";

interface MenuItem {
  id: number;
  title: string;
  imageUrl: string;
  userId: number;
}

const MyMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [restaurantName, setRestaurantName] = useState("");
  const navigate = useNavigate();

  async function myMenu() {
    const restaurantId = localStorage.getItem("userId");
    const res = await axios.get(
      `${BACKEND_URL}/api/v1/restaurant/menu/${restaurantId}`,
      {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      }
    );
    setRestaurantName(res.data.restaurantName.restaurantName);
    setMenuItems(res.data.restaurant_menu);
  }

  useEffect(() => {
    myMenu();
  }, []);

  return (
    <div className="p-2 bg-gray-900 md:p-8">
      {/* Top Section */}
      <div className="relative mb-6 flex flex-col md:flex-row items-center md:items-start md:justify-start">
        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-2 md:mr-4">
          <button
            onClick={() => navigate("/qrCode")}
            className="w-full md:w-auto px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300"
          >
            Generate QR Code
          </button>

          <Link to={"/onboarding/upload/menu"} >
          <button
            className="w-full md:w-auto px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300"
          >
            Upload more Menus
          </button>
          </Link>
          
        </div>

        {/* Restaurant Name */}
        <h1 className="text-yellow-400 pl-6 text-4xl font-bold mt-4 md:mt-0 md:ml-4 text-center md:text-left">
          {restaurantName}
        </h1>
      </div>

      {/* Menu Items Grid */}
      <div className="sm:grid sm:grid-cols-3 p-4 sm:gap-12">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="border border-yellow-400 m-8 rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-auto"
          >
            <div className="aspect-[210/297] bg-yellow-400">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  {item.title}
                </h3>
              </div>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-fill"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMenu;
