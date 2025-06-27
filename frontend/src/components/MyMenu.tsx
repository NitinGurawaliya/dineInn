import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";
import { Edit, Trash2, Plus, Settings, QrCode, Upload, Save, X, Menu as MenuIcon } from "lucide-react";
import Button from "./ui/Button";
import { toPng } from "html-to-image";

interface MenuItem {
  id: number;
  title: string;
  imageUrl: string;
  userId: number;
}

interface RestaurantDetails {
  id: number;
  restaurantName: string;
  contactNum: string;
  city: string;
  upiQrUrl: string;
  WeekdaysWorking: string;
  WeekendWorking: string;
  Logo: string;
  Instagram: string;
  Facebook: string;
  bgColor: string;
  componentColor: string;
  menus: MenuItem[];
  user: {
    email: string;
  };
}

const MyMenu = () => {
  const [restaurantData, setRestaurantData] = useState<RestaurantDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingRestaurant, setEditingRestaurant] = useState(false);
  const [editingMenu, setEditingMenu] = useState<number | null>(null);
  const [showMenuDeleteConfirm, setShowMenuDeleteConfirm] = useState<number | null>(null);
  const navigate = useNavigate();

  // Form states for restaurant details
  const [restaurantForm, setRestaurantForm] = useState({
    restaurantName: "",
    contactNum: "",
    city: "",
    WeekdaysWorking: "",
    WeekendWorking: "",
    Facebook: "",
    Instagram: "",
    bgColor: "",
    componentColor: "",
  });

  // Form states for menu item
  const [menuForm, setMenuForm] = useState({
    title: "",
  });

  // File states
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [upiQrFile, setUpiQrFile] = useState<File | null>(null);
  const [menuImageFile, setMenuImageFile] = useState<File | null>(null);

  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const qrRef = useRef<HTMLDivElement>(null);
  const qrModalRef = useRef<HTMLDivElement>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  async function fetchRestaurantData() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/api/v1/restaurant/dashboard/details`, {
        headers: {
          Authorization: token || "",
        },
      });
      setRestaurantData({
        ...response.data,
        menus: [...response.data.menus].sort((a, b) => a.id - b.id),
      });
      setRestaurantForm({
        restaurantName: response.data.restaurantName,
        contactNum: response.data.contactNum || "",
        city: response.data.city || "",
        WeekdaysWorking: response.data.WeekdaysWorking || "",
        WeekendWorking: response.data.WeekendWorking || "",
        Facebook: response.data.Facebook || "",
        Instagram: response.data.Instagram || "",
        bgColor: response.data.bgColor || "#ffffff",
        componentColor: response.data.componentColor || "#000000",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  // Fetch QR code after restaurantData is loaded
  useEffect(() => {
    if (restaurantData && restaurantData.id) {
      const fetchQr = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`${BACKEND_URL}/api/v1/restaurant/generate-qr-code/${restaurantData.id}`, {
            headers: { Authorization: token || "" },
          });
          // Assume backend returns { qrCodeUrl: string }
          setQrCodeUrl(res.data.qrCodeUrl || null);
        } catch (error:any) {
          setQrCodeUrl(null);
        }
      };
      fetchQr();
    }
  }, [restaurantData]);

  const handleRestaurantUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      
      // Add form fields
      Object.entries(restaurantForm).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Add files if selected
      if (logoFile) formData.append("Logo", logoFile);
      if (upiQrFile) formData.append("upiQr", upiQrFile);

      await axios.put(`${BACKEND_URL}/api/v1/restaurant/dashboard/update`, formData, {
        headers: {
          Authorization: token || "",
          "Content-Type": "multipart/form-data",
        },
      });

      setEditingRestaurant(false);
      setLogoFile(null);
      setUpiQrFile(null);
      fetchRestaurantData(); // Refresh data
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  const handleMenuUpdate = async (menuId: number) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      
      formData.append("title", menuForm.title);
      if (menuImageFile) formData.append("image", menuImageFile);

      await axios.put(`${BACKEND_URL}/api/v1/restaurant/dashboard/menu/${menuId}`, formData, {
        headers: {
          Authorization: token || "",
          "Content-Type": "multipart/form-data",
        },
      });

      setEditingMenu(null);
      setMenuImageFile(null);
      setMenuForm({ title: "" });
      fetchRestaurantData(); // Refresh data
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const handleMenuDelete = async (menuId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/api/v1/restaurant/dashboard/menu/${menuId}`, {
        headers: {
          Authorization: token || "",
        },
      });

      setShowMenuDeleteConfirm(null);
      fetchRestaurantData(); // Refresh data
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  // Download QR as image (for dashboard card)
  const handleDownloadQR = async () => {
    if (qrRef.current) {
      const dataUrl = await toPng(qrRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${restaurantData?.restaurantName || "restaurant"}-qr-code.png`;
      link.click();
    }
  };

  // Download QR as image (for modal)
  const handleDownloadQRModal = async () => {
    if (qrModalRef.current) {
      const dataUrl = await toPng(qrModalRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${restaurantData?.restaurantName || "restaurant"}-qr-code.png`;
      link.click();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!restaurantData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Restaurant not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 px-2 py-4 md:p-6 border-b border-gray-700">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              {restaurantData.Logo && (
                <img
                  src={restaurantData.Logo}
                  alt="Logo"
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                />
              )}
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400">
                  {restaurantData.restaurantName}
                </h1>
                <p className="text-gray-400 text-sm sm:text-base">{restaurantData.city}</p>
              </div>
            </div>
            {/* Hamburger for sm screens */}
            <button
              className="block md:hidden p-2 rounded-lg hover:bg-gray-700 transition ml-auto"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon className="w-7 h-7 text-white" />
            </button>
            {/* Inline buttons for md+ */}
            <div className="hidden md:flex flex-row flex-wrap gap-2 items-center justify-center mt-2 md:mt-0">
              <button
                onClick={() => navigate("/qrCode")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <QrCode className="w-4 h-4" />
                Generate QR
              </button>
              <Link to="/onboarding/upload/menu">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  Add Menu
                </button>
              </Link>
              <button
                onClick={() => setEditingRestaurant(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hamburger modal/drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="absolute inset-0" onClick={() => setMenuOpen(false)} />
          <div className="relative z-10 bg-gray-800 rounded-xl shadow-lg p-6 w-11/12 max-w-xs mx-auto flex flex-col gap-4">
            <button
              onClick={() => { setMenuOpen(false); navigate("/qrCode"); }}
              className="flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition w-full"
            >
              <QrCode className="w-6 h-6" />
              Generate QR Code
            </button>
            <Link to="/onboarding/upload/menu" className="w-full">
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold bg-gray-700 text-white rounded-xl shadow hover:bg-gray-800 transition w-full"
              >
                <Upload className="w-6 h-6" />
                Add Menu
              </button>
            </Link>
            <button
              onClick={() => { setMenuOpen(false); setEditingRestaurant(true); }}
              className="flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold bg-gray-600 text-white rounded-xl shadow hover:bg-gray-700 transition w-full"
            >
              <Settings className="w-6 h-6" />
              Settings
            </button>
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl font-bold"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full px-2 md:p-6">
        {/* Restaurant Details Section */}
        <div className="bg-gray-800 rounded-lg p-3 sm:p-4 md:p-6 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4">Restaurant Information</h2>
          
          {editingRestaurant ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Restaurant Name</label>
                  <input
                    type="text"
                    value={restaurantForm.restaurantName}
                    onChange={(e) => setRestaurantForm({...restaurantForm, restaurantName: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Number</label>
                  <input
                    type="text"
                    value={restaurantForm.contactNum}
                    onChange={(e) => setRestaurantForm({...restaurantForm, contactNum: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    value={restaurantForm.city}
                    onChange={(e) => setRestaurantForm({...restaurantForm, city: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Weekdays Hours</label>
                  <input
                    type="text"
                    value={restaurantForm.WeekdaysWorking}
                    onChange={(e) => setRestaurantForm({...restaurantForm, WeekdaysWorking: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    placeholder="9am-10pm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Weekend Hours</label>
                  <input
                    type="text"
                    value={restaurantForm.WeekendWorking}
                    onChange={(e) => setRestaurantForm({...restaurantForm, WeekendWorking: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    placeholder="10am-11pm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Facebook</label>
                  <input
                    type="text"
                    value={restaurantForm.Facebook}
                    onChange={(e) => setRestaurantForm({...restaurantForm, Facebook: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram</label>
                  <input
                    type="text"
                    value={restaurantForm.Instagram}
                    onChange={(e) => setRestaurantForm({...restaurantForm, Instagram: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Background Color</label>
                  <input
                    type="color"
                    value={restaurantForm.bgColor}
                    onChange={(e) => setRestaurantForm({...restaurantForm, bgColor: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Component Color</label>
                  <input
                    type="color"
                    value={restaurantForm.componentColor}
                    onChange={(e) => setRestaurantForm({...restaurantForm, componentColor: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Logo (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">UPI QR Code (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUpiQrFile(e.target.files?.[0] || null)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button loading={loading} onClick={handleRestaurantUpdate} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
                <button
                  onClick={() => setEditingRestaurant(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-400">Contact</h3>
                <p>{restaurantData.contactNum || "Not set"}</p>
                <p className="text-gray-400">{restaurantData.user.email}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-400">Hours</h3>
                <p>Weekdays: {restaurantData.WeekdaysWorking || "Not set"}</p>
                <p>Weekend: {restaurantData.WeekendWorking || "Not set"}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-400">Social Media</h3>
                <p>Facebook: {restaurantData.Facebook || "Not set"}</p>
                <p>Instagram: {restaurantData.Instagram || "Not set"}</p>
              </div>
            </div>
          )}
        </div>

        {/* QR Code Section */}
        <div className="bg-gray-800 rounded-lg p-3 sm:p-4 md:p-6 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4">QR Code</h2>
          {qrCodeUrl ? (
            <div className="flex flex-col items-center">
              <div
                ref={qrRef}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center w-full max-w-xs cursor-pointer"
                onClick={() => setQrModalOpen(true)}
                title="Click to enlarge"
              >
                <h2 className="text-lg sm:text-xl flex justify-center font-bold mb-1 text-red-800">
                  {restaurantData?.restaurantName}
                </h2>
                <h1 className="text-xs mb-1 font-extrabold text-center text-black font-mono drop-shadow-lg">
                  📍 {restaurantData?.city}
                </h1>
                <h2 className="text-base sm:text-lg flex justify-center font-bold mb-4 text-gray-800">
                  SCAN ME FOR MENU
                </h2>
                <img
                  src={qrCodeUrl.startsWith("data:image") ? qrCodeUrl : `data:image/png;base64,${qrCodeUrl}`}
                  alt="Restaurant Menu QR Code"
                  className="w-32 h-32 sm:w-40 sm:h-40 object-contain mb-2"
                />
                <h1 className="text-xs font-extrabold text-center text-black font-mono drop-shadow-lg">
                  📞 +91{restaurantData?.contactNum}
                </h1>
              </div>
              <button
                onClick={handleDownloadQR}
                className="mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition w-full sm:w-auto"
              >
                Download QR Code
              </button>

              {/* QR Modal Popup */}
              {qrModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-2">
                  <div className="absolute inset-0" onClick={() => setQrModalOpen(false)} />
                  <div className="relative z-10 w-full max-w-lg mx-auto">
                    <div ref={qrModalRef} className="bg-white p-4 sm:p-8 rounded-lg shadow-2xl flex flex-col items-center w-full">
                      <h2 className="text-2xl sm:text-3xl md:text-5xl flex justify-center font-bold mb-2 text-red-800">
                        {restaurantData?.restaurantName}
                      </h2>
                      <h1 className="text-sm sm:text-md mr-2 mb-2 md:text-xl md:mb-4 font-extrabold text-center text-black font-mono drop-shadow-lg">
                        📍 {restaurantData?.city}
                      </h1>
                      <h2 className="text-lg sm:text-2xl md:text-4xl flex justify-center font-bold mb-6 md:mb-11 text-gray-800">
                        SCAN ME FOR MENU
                      </h2>
                      <img
                        src={qrCodeUrl.startsWith("data:image") ? qrCodeUrl : `data:image/png;base64,${qrCodeUrl}`}
                        alt="Restaurant Menu QR Code"
                        className="w-48 h-48 sm:w-64 sm:h-64 object-contain mb-4"
                      />
                      <h1 className="text-sm sm:text-md md:text-xl mb-2 md:mb-4 font-extrabold text-center text-black font-mono drop-shadow-lg">
                        📞 +91{restaurantData?.contactNum}
                      </h1>
                    </div>
                    <button
                      onClick={handleDownloadQRModal}
                      className="mt-4 w-full px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                      Download QR Code
                    </button>
                    <button
                      onClick={() => setQrModalOpen(false)}
                      className="absolute top-2 right-2 text-gray-700 bg-white rounded-full p-2 shadow hover:bg-gray-200"
                      title="Close"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No QR code generated yet</p>
              <p className="text-gray-500 text-sm">Generate a QR code using the button above</p>
            </div>
          )}
        </div>

        {/* Menu Items Section */}
        <div className="bg-gray-800 rounded-lg p-3 sm:p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2 sm:gap-0">
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-400">Menu Items ({restaurantData.menus.length})</h2>
            <Link to="/onboarding/upload/menu" className="w-full sm:w-auto">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                Add New Menu
              </button>
            </Link>
          </div>

          {restaurantData.menus.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No menu items yet</p>
              <Link to="/onboarding/upload/menu" className="w-full sm:w-auto">
                <button className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto">
                  Upload Your First Menu
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {restaurantData.menus.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-700 rounded-lg overflow-hidden shadow-lg flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title || "Menu item"}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => setEditingMenu(item.id)}
                        className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowMenuDeleteConfirm(item.id)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {editingMenu === item.id ? (
                    <div className="p-4 flex flex-col gap-2">
                      <input
                        type="text"
                        value={menuForm.title}
                        onChange={(e) => setMenuForm({title: e.target.value})}
                        placeholder="Menu item title"
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white mb-2"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setMenuImageFile(e.target.files?.[0] || null)}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white mb-2"
                      />
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button loading={loading} onClick={() => handleMenuUpdate(item.id)} className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto">
                          Save
                        </Button>
                        <button
                          onClick={() => {
                            setEditingMenu(null);
                            setMenuForm({title: ""});
                            setMenuImageFile(null);
                          }}
                          className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                        {item.title || "Untitled Menu Item"}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">ID: {item.id}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modals */}
        {showMenuDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg sm:text-xl font-bold text-red-400 mb-4">Delete Menu Item</h3>
              <p className="text-gray-300 mb-6 text-sm sm:text-base">
                Are you sure you want to delete this menu item? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button loading={loading} onClick={() => handleMenuDelete(showMenuDeleteConfirm)} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full sm:w-auto">
                  Delete
                </Button>
                <button
                  onClick={() => setShowMenuDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMenu;
