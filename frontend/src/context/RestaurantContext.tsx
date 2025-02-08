import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface MenuItem {
  id: number;
  imageUrl: string;
  title: string | null;
  restaurantDetailsId: number;
}

interface RestaurantDetails {
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
}

interface RestaurantContact {
  email: string;
}

interface RestaurantData {
  menus: MenuItem[];
  resName: RestaurantDetails;
  resContact: RestaurantContact;
}

interface RestaurantContextType {
  data: RestaurantData | null;
  loading: boolean;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams();
  const [data, setData] = useState<RestaurantData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRestaurantDetails() {
      try {
        if (!id) return;
        const response = await axios.get(`${BACKEND_URL}/api/v1/restaurant/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurantDetails();
  }, [id]);

  return (
    <RestaurantContext.Provider value={{ data, loading }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
};
