import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface MenuItem {
  id: number;
  title: string;
  imageUrl: string;
  userId: number;
}

 const MyMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [restaurantName, setRestaurantName] = useState("");
  const navigate = useNavigate()

  async function myMenu() {
    console.log("inside my menucomp ")
    const restaurantId = localStorage.getItem("userId");
    const res = await axios.get(
      `${BACKEND_URL}/api/v1/restaurant/menu/${restaurantId}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
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
    <div className="p-2 md:p-8">
      
      <div className="relative mb-6 flex items-center">
        {/* Centered Restaurant Name */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
          {restaurantName}
        </h1>

        <button onClick={()=>{navigate("/qrCode")}} className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Generate QR Code
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-auto"
          >
            <div className="aspect-[210/297] bg-gray-100">
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
