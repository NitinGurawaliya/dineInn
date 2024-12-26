import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import { toPng } from "html-to-image";
 

const Qrcode = () => {
  const [qrCode, setQrcode] = useState<string | null>(null);
  const [restaurantName,setRestaurantName] = useState("");
  const[location,setLocation] = useState("");
  const[contact,setContact] = useState("")
  const qrRef = useRef<HTMLDivElement>(null)



  async function getQrcode() {
    const id = localStorage.getItem("userId");

    const res = await axios.get(
      `${BACKEND_URL}/api/v1/restaurant/generate-qr-code/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const qrcode = res.data.qrCodeUrl;
    setQrcode(res.data.qrCodeUrl);
    setRestaurantName(res.data.restaurantDetails.restaurantName)
    setLocation(res.data.restaurantDetails.city)
    setContact(res.data.restaurantDetails.contactNum)
    console.log(qrcode);
  }

  useEffect(() => {
    getQrcode();
  }, []);

  const handleDownload = async () => {
    if (qrRef.current) {
      // Convert the `qrRef` div to an image
      const dataUrl = await toPng(qrRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "your Qr.png";
      link.click();
    }
  };

  return (
    <div    className="min-h-screen  border-red-50 border-2 flex flex-col items-center justify-center bg-gray-100 ">
     
      <div ref={qrRef}  className=" bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl  flex justify-center md:text-5xl font-bold mb-2 text-red-800">
          {restaurantName}
        </h2>

        <h1 className="text-md  mr-2 mb-2 md:text-xl md:mb-4 font-extrabold text-center text-black font-mono drop-shadow-lg">
              📍 {location}
            </h1>

        <h2 className="text-2xl  flex justify-center md:text-4xl font-bold mb-11 text-gray-800">
          SCAN ME FOR MENU
        </h2>
        
        {qrCode ? (
          <div className="flex flex-col items-center">
            {/* Display QR Code */}
            <img
              src={qrCode.startsWith("data:image") ? qrCode : `data:image/png;base64,${qrCode}`}
              alt="Restaurant Menu QR Code"
              className="w-64 h-64 object-contain mb-4"
            />

            <div className="flex">

            

            <h1 className="text-md mb-2 md:text-xl md:mb-4 font-extrabold text-center text-black font-mono drop-shadow-lg">
            📞 +91{contact}
            </h1>

            </div>
          </div>
        ) : (
          <p className="text-gray-600">Loading QR Code...</p>
        )}
      </div>
        {/* Download Button */}
        <a
              // href={qrCode.startsWith("data:image") ? qrCode : `data:image/png;base64,${qrCode}`}
              onClick={handleDownload}
              // download="restaurant-qrcode.png"
              className="px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Download QR Code
            </a>
    </div>
  );
};

export default Qrcode;
