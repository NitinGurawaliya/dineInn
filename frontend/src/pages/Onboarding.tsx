import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export default function RestaurantDetails() {
  const [restaurantName, setRestaurantName] = useState('')
  const [contactNum, setContactNum] = useState('')
  const [city, setCity] = useState('')
  const [WeekdaysWorking, setWeekdaysWorking] = useState('')
  const [WeekendWorking, setWeekendWorking] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(event:React.FormEvent) {
    event.preventDefault()
    console.log({ restaurantName, contactNum, city, WeekdaysWorking, WeekendWorking })

     await axios.post(`${BACKEND_URL}/api/v1/restaurant/onboarding`,{
      restaurantName,
      contactNum,
      city,
      WeekdaysWorking,
      WeekendWorking
    },{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    })

    navigate("/onboarding/upload/menu")
  } 

  return (
    <div className="min-h-screen bg-gray-900 py-0 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md lg:max-w-4xl">
        <div className="relative">
          <div className="absolute top-0 left-0 mt-8">
          <Link to="/signup" className="inline-flex items-center text-yellow-400 hover:text-yellow-300">
            <ArrowLeft className="mr-2 h-5 w-5" />
                 Step 2/3
          </Link>
          </div>
        </div>
      
      </div>

      <div className="mt-2 p-8 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-2xl">
        <div className="bg-gray-800 pt-2 pb-4 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 className="mt-6 mb-6 text-center text-3xl font-extrabold text-yellow-400">Enter Your Business  Details</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-300">
                  Business Name
                </label>
                <div className="mt-1">
                  <input
                    id="restaurantName"
                    name="restaurantName"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-gray-700 text-white"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactNum" className="block text-sm font-medium text-gray-300">
                  Contact Number
                </label>
                <div className="mt-1">
                  <input
                    id="contactNum"
                    name="contactNum"
                    type="tel"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-gray-700 text-white"
                    value={contactNum}
                    onChange={(e) => setContactNum(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-300">
                  City
                </label>
                <div className="mt-1">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-gray-700 text-white"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300">
                  Business Location (Optional)
                </label>
                {/* <div className="mt-1">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-gray-700 text-white"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Full address of your business "
                  />
                </div> */}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="weekdayHours" className="block text-sm font-medium text-gray-300">
                  Weekday Hours (Mon-Fri)
                </label>
                <div className="mt-1">
                  <input
                    id="weekdayHours"
                    name="weekdayHours"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-gray-700 text-white"
                    value={WeekdaysWorking}
                    onChange={(e) => setWeekdaysWorking(e.target.value)}
                    placeholder="e.g., 9AM-9PM"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="weekendHours" className="block text-sm font-medium text-gray-300">
                  Weekend Hours (Sat-Sun)
                </label>
                <div className="mt-1">
                  <input
                    id="weekendHours"
                    name="weekendHours"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-gray-700 text-white"
                    value={WeekendWorking}
                    onChange={(e) => setWeekendWorking(e.target.value)}
                    placeholder="e.g., 10AM-8PM"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-yellow-400">
              * It will take only 1 min to create your menu website. Please keep your menu images or menu card ready for upload.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

