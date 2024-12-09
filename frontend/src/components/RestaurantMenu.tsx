'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import Slider from "react-slick";
import Footer from "./Footer";
import { BACKEND_URL } from "../config";
import BottomNavbar from "./BottomNav";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-image-gallery/styles/css/image-gallery.css";

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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
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

  // Settings for react-slick
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Convert images for react-image-gallery
  const galleryImages = menuItems.map((item) => ({
    original: item.imageUrl,
    thumbnail: item.imageUrl,
    originalTitle: item.title,
  }));

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Restaurant Name */}
          <h1 className="text-4xl font-bold text-center mb-4 text-orange-700">
            {restaurantName.toUpperCase()}
          </h1>
          <h2 className="text-lg text-center mb-6 text-gray-600">
            📍 {location}
          </h2>

          {/* Image Carousel */}
          <Slider {...slickSettings}>
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  setIsGalleryOpen(true);
                  setCurrentImageIndex(index);
                }}
                className="cursor-pointer p-2"
              >
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-center w-full py-2">
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Full-Screen Image Gallery */}
          {isGalleryOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
              <div className="relative w-full max-w-5xl">
                <button
                  className="absolute top-4 right-4 text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md"
                  onClick={() => setIsGalleryOpen(false)}
                >
                  ✖ Close
                </button>
                <ImageGallery
                  items={galleryImages}
                  startIndex={currentImageIndex}
                  showThumbnails={true}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  onSlide={(index) => setCurrentImageIndex(index)}
                  additionalClass="bg-black rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <BottomNavbar contact={contact} />
    </div>
  );
};

export default RestaurantMenu;
