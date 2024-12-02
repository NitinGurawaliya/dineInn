import axios from 'axios';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState("");
  const[password,setPassword] = useState("")
  const navigate = useNavigate()

  async function SigninHandler() {
    console.log("hi")
    const res = await axios.post("http://localhost:4000/api/v1/restaurant/signin",{
      email,
      password
    })

    const data = res.data;
    const userId =data.userId
    console.log(data)
    localStorage.setItem("token",`Bearer ${data.token}`)
    localStorage.setItem("userId",userId)
    navigate("/myMenu")
    alert("signin done")
    console.log(userId)
  }

  return (
    <div className="min-h-screen bg-gray-900 py-0 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="relative">
  <div className="absolute top-0 left-[-200px] mt-8">
    <Link to="/" className="inline-flex items-center text-yellow-400 hover:text-yellow-300">
      <ArrowLeft className="mr-2 h-5 w-5" />
      Back to home
    </Link>
  </div>
</div>

     



        <h2 className="mt-6 text-center text-3xl font-extrabold text-yellow-400">
          DineInn
        </h2>
        <p className="mt-2 text-center text-sm text-white">
          Take you local business online in few clicks
        </p>

        
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
  

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-gray-700 text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  onChange={(e)=>{setPassword(e.target.value)}}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-gray-700 text-white pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>


            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-yellow-400 focus:ring-yellow-500 border-gray-600 rounded bg-gray-700"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the{' '}
                <a href="#" className="text-yellow-400 hover:text-yellow-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-yellow-400 hover:text-yellow-300">
                  Privacy Policy
                </a>
              </label>
            </div>

          <div className="mt-8 sm:mx-auto  sm:w-full sm:max-w-md text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-yellow-400 hover:text-yellow-300">
                Sign in
              </Link>
            </p>
      </div>

            <div>
              <button
                type="submit"
                onClick={SigninHandler}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
               Login
              </button>
            </div>
          </form>

         
        </div>
      </div>

      

      
    </div>
  )
}
