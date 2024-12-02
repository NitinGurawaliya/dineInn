import axios from "axios";
import { useEffect, useState } from "react";

const Qrcode = () => {
  const [qrCode, setQrcode] = useState<string | null>(null);

  async function getQrcode() {
    const id = localStorage.getItem("userId");

    const res = await axios.get(
      `http://localhost:4000/api/v1/restaurant/generate-qr-code/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const qrcode = res.data.qrCodeUrl;
    setQrcode(res.data.qrCodeUrl);
    console.log(qrcode);
  }

  useEffect(() => {
    getQrcode();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800">
        Restaurant Menu QR Code
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {qrCode ? (
          <div className="flex flex-col items-center">
            {/* Display QR Code */}
            <img
              src={qrCode.startsWith("data:image") ? qrCode : `data:image/png;base64,${qrCode}`}
              alt="Restaurant Menu QR Code"
              className="w-64 h-64 object-contain mb-4"
            />

            {/* Download Button */}
            <a
              href={qrCode.startsWith("data:image") ? qrCode : `data:image/png;base64,${qrCode}`}
              download="restaurant-qrcode.png"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Download QR Code
            </a>
          </div>
        ) : (
          <p className="text-gray-600">Loading QR Code...</p>
        )}
      </div>
    </div>
  );
};

export default Qrcode;
