'use client'

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
  const [location,setLocation] = useState("")
  const [contact,setContact] = useState("")

  const { id } = useParams();

  async function resMenu() {
    const res = await axios.get(`${BACKEND_URL}/api/v1/restaurant/${id}`);
    setMenuItems(res.data.menus);
    setRestaurantName(res.data.resName.restaurantName);
    console.log(location)
    setLocation(res.data.resName.City);
    
    setContact(res.data.resName.ContactNum)
    console.log(contact)

  }

  useEffect(() => {
    resMenu();
  }, []);

  return (
    <div>
    <div className="min-h-screen bg-white  p-4 md:p-b-4">
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
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105"
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
    <Footer />
    <BottomNavbar  contact={contact} />
    </div>
  );
};

export default RestaurantMenu;
