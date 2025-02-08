import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import HomePage from "../components/HomeComponent";
import { BACKEND_URL } from "../config";
import axios from "axios";
import HomePageSkeleton from "../components/HomeSkeleton";

interface Data{
    id: number,
    restaurantName: string,
    Instagram: string,
    location: string,
    whatsapp: string,
    contactNum: string,
    Logo: string}

export default function Home(){
    const {id} = useParams();
    const [data,setData] = useState<Data | null>(null)

    async function resDetails() {
        
        console.log(id)
        const res = await axios.get(`${BACKEND_URL}/api/v1/restaurant/${id}`);

        console.log(res.data)
        setData(res.data.resName)
        
    }

    useEffect(()=>{
        resDetails()
    },[])

    if (!data) return <div><HomePageSkeleton /> </div>; // Handle loading state properly


    return <div>
       <HomePage
        id={id || ""}
        restaurantName={data.restaurantName}
        instagram={data.Instagram}
        location={data.location}
        whatsapp={data.whatsapp}
        contactNumber={data.contactNum}
        logo={data.Logo}
      />

    </div>
}