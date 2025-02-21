import {Link} from "react-router-dom"
import {   Phone, MessageCircle, InstagramIcon } from "lucide-react"
import { FRONTEND_URL } from "../config"

interface RestaurantHomePageProps {
    id: string,
    restaurantName: string,
    instagram: string,
    location: string,
    whatsapp: string,
    contactNumber: string,
    logo: string
}
//bg-[#ceccc9]
const   HomePage: React.FC<RestaurantHomePageProps> = ({ restaurantName, id, instagram,  whatsapp, contactNumber, logo }) => {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white  px-4 py-8">
            {/* Logo Section */}
            <div onClick={()=>{window.location.reload()}} className="flex cursor-pointer flex-col items-center mb-6">
              {<img
                src={logo}
               
                className="w-52 h-52 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 "
              />}
            </div>

            {/* Welcome Text */}
            <h1 className="text-4xl font-bold mt-8 mb-12 text-center">
                Welcome to
                <br />
                {restaurantName}
            </h1>

            {/* Social Icons */}
            <div className="flex justify-center gap-8 mb-12">
                <button onClick={()=>{
                    const url = `https://www.instagram.com/${instagram}`
                    window.open(url, '_blank');
                }} className="text-black hover:opacity-75 transition-opacity">
                    <InstagramIcon className="w-7 h-7" />
                </button>
                {/* <Link to="#" className="text-black hover:opacity-75 transition-opacity">
                    <MapPin className="w-7 h-7" />
                    <span className="sr-only">{location}</span>
                </Link> */}
                <button onClick={()=>{
                     const url = `https://api.whatsapp.com/send?phone=${whatsapp}`
                     window.open(url,'_blank');
                }} className="text-black hover:opacity-75 transition-opacity" >
                    <MessageCircle className="w-7 h-7" />
                </button>
                <Link to={`tel:${contactNumber}`} className="text-black hover:opacity-75 transition-opacity">
                    <Phone className="w-7 h-7" />
                    <span className="sr-only">{contactNumber}</span>
                </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-6 w-full max-w-md">
                <Link
                    to={`${FRONTEND_URL}/menu/${id}`}
                    className="border-2 border-black px-8 py-4 text-center hover:bg-black hover:text-white transition-colors"
                >
                    VIEW DINE INN MENU
                </Link>
                <Link
                    to="#"
                    className="border-2 border-black px-8 py-4 text-center hover:bg-black hover:text-white transition-colors"
                >
                    RATE OUR RESTAURANT
                </Link>
            </div>
        </main>
    )
}

export default HomePage;
