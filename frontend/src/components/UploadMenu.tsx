import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { BACKEND_URL } from "../config";

export default function MenuUpload() {
  const [menuImages, setMenuImages] = useState<File[]>([]); // Updated for multiple files
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMenuImages(Array.from(e.target.files)); // Convert FileList to array
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (menuImages.length === 0) {
        alert("Please select at least one file.");
        setUploading(false);
        return;
      }

      const uploadPromises = menuImages.map((file) => {
        const formData = new FormData();
        formData.append("image", file); 
        formData.append("title", title);

        return axios.post(`${BACKEND_URL}/api/v1/restaurant/menu/upload`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        });
      });

      const responses = await Promise.all(uploadPromises);
      console.log("Upload successful:", responses.map((res) => res.data));

      // const id = localStorage.getItem("userId");
      navigate("/dashboard");
      alert("Menus uploaded successfully!");
    } catch (error) {
      console.error("Error uploading menus:", error);
      alert("Failed to upload the menus. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // from-amber-100 to-orange-200

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-900  flex items-center justify-center p-4">
      <div className="bg-gray-900 border-yellow-400 border-4 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">Upload Menu Photos</h1>
        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label htmlFor="menuPhotos" className="block text-sm font-medium text-yellow-400 mb-2">
              Menu Photos
            </label>
            <input
              id="menuPhotos"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              multiple 
              required
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-orange-50 file:text-orange-700
                hover:file:bg-orange-100
                cursor-pointer"
            />
          </div>
          <input
            className="p-2 w-full border border-yellow-400 rounded-lg"
            placeholder="Enter menu category"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Upload Menus"}
          </button>
        </form>
      </div>
    </div>
  );
}
