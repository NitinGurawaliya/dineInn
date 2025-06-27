import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { BACKEND_URL, FRONTEND_URL } from "../config";
import BottomNavbar from "./BottomNav";
import BlogSkeleton from "./Skeleton";
import { Fullscreen, ChevronLeft, ChevronRight, X } from "lucide-react";

interface MenuItem {
  id: number;
  title: string;
  imageUrl: string;
  userId: number;
}

const RestaurantMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [contact, setContact] = useState("");
  const [upiQr,setUpiQr] = useState("");
  const[weekdayHours,setWeekdayHours] = useState("")
  const[weekendHours,setWeekendHours] = useState("")
  const[link,setLink] = useState("")
  const[logo,setLogo] = useState('')
  const[instagram,setInstagram] = useState("")
  const[facebook,setFacebook ] = useState("")
  const[email,setEmail ] = useState('')
  const [loading,setLoading] = useState(true);
  const[bgColor,setBgcolor]= useState("")
  const[componentColor,setComponentColor] = useState("")

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { id } = useParams();

  async function resMenu() {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/restaurant/${id}`);
      const link = `${FRONTEND_URL}/menu/${id}`;
      setLoading(true)
      setLink(link)
      setMenuItems(res.data.menus);
      setRestaurantName(res.data.resName.restaurantName);
      setLocation(res.data.resName.city);
      setContact(res.data.resName.contactNum);
      setUpiQr(res.data.resName.upiQrUrl); // Set the UPI QR URL
      setWeekdayHours(res.data.resName.WeekdaysWorking);
      setWeekendHours(res.data.resName.WeekendWorking);
      setInstagram(res.data.resName.Instagram)
      setFacebook(res.data.resName.Facebook)
      setLogo(res.data.resName.Logo)
      setEmail(res.data.resContact.email);
      setBgcolor(res.data.resName.bgColor);
      setComponentColor(res.data.resName.componentColor)

      setLoading(false)

      console.log(weekdayHours)
    } catch (error) {
      console.error("Failed to fetch restaurant data", error);
    }
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
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % menuItems.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePreviousImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + menuItems.length) % menuItems.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null) {
      const swipeDistance = touchStart - touchEnd;
      const threshold = 50; // Minimum swipe distance to register as a swipe
      if (swipeDistance > threshold) {
        handleNextImage(); // Swipe left
      } else if (swipeDistance < -threshold) {
        handlePreviousImage(); // Swipe right
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          handlePreviousImage();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
        case 'Escape':
          closeFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, isAnimating]);

  if(loading){
    return<div>
      <BlogSkeleton />
    </div>
  }

  return (
    <div>
      <div className="min-h-screen  p-4 md:p-b-4"
      style={{
        backgroundColor:bgColor,
      }}>
        <div className="max-w-6xl mx-auto">
            <div onClick={()=>{window.location.reload()}} className="flex cursor-pointer flex-col items-center mb-6">
              {<img
                src={logo}
               
                className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56  "
              />}
            </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4 md:mb-6  font-serif drop-shadow-lg" style={
           { color:componentColor}
          }>
            {restaurantName ? restaurantName.toUpperCase() : "Loading..."}
          </h1>

          <h1 className={`text-xl md:text-2xl mb-4 md:mb-8 font-extrabold text-center text-${componentColor}-400 font-serif drop-shadow-lg`}>
            📍 {location ?.toUpperCase()}
          </h1>
          <div>
     
    </div>

          {/* Menu Grid */}
          {/* Menu Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {menuItems.map((item, index) => (
    <div
      key={item.id}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105 relative cursor-pointer"
      onClick={() => openFullscreen(index)}
    >
      {/* Image */}
      <div className="relative w-full pt-[141.4%] ">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="absolute top-0 left-0 w-full h-full object-contain rounded-t-lg"
        />
        {/* Expand Icon at the Top Right */}
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md">
          <Fullscreen className="w-4 h-4 text-gray-700" />
        </div>
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

      {/* Enhanced Fullscreen Image Viewer */}
      {isFullscreen && menuItems.length > 0 && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10 bg-black/50 backdrop-blur-sm p-3 rounded-full"
            onClick={closeFullscreen}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium z-10">
            {currentImageIndex + 1} / {menuItems.length}
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10 bg-black/50 backdrop-blur-sm p-3 rounded-full disabled:opacity-50"
            onClick={handlePreviousImage}
            disabled={isAnimating}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10 bg-black/50 backdrop-blur-sm p-3 rounded-full disabled:opacity-50"
            onClick={handleNextImage}
            disabled={isAnimating}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Main Image */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={menuItems[currentImageIndex].imageUrl}
              alt={menuItems[currentImageIndex].title}
              className={`max-w-full max-h-full object-contain transition-all duration-300 ${
                isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
              }`}
            />
          </div>

          {/* Image Title */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full text-center max-w-md">
            <h3 className="text-lg font-semibold truncate">
              {menuItems[currentImageIndex].title}
            </h3>
          </div>

          {/* Swipe Instructions */}
        </div>
      )}

      <Footer facebook={facebook} instagram={instagram} contact = {contact} email= {email} weekdayHours={weekdayHours} weekendHours={weekendHours}  />
      <BottomNavbar componentColor={componentColor}  link={link} upiQr={upiQr||"QR code not available"} contact={contact || "No contact available"} />
    </div>
  );
};

export default RestaurantMenu;
