import { Link } from 'react-router-dom';
import { ArrowRight} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 pt-2 text-white">
      {/* Header */}
      <header className="py-4 border-b border-gray-700">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-5xl font-bold text-yellow-400">DineInn</h1>
          <nav className=''> 
            <ul className="flex space-x-6">
              <Link to={"/signup"}>
                <li><button className="bg-yellow-400 border-2 border-yellow-400 text-gray-900 px-8 py-4 rounded-full hover:bg-yellow-300 hover:border-yellow-300 transition duration-300 font-medium">Sign Up</button></li>
              </Link>
              
              <Link to={"/signin"} >
                <li><div className="bg-transparent text-md border-yellow-400 border-2 text-yellow-400 px-8 py-4 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition duration-300 font-medium">Login</div></li>
              </Link>

              <Link to={"/"} >
                <li><div className="bg-gray-800 text-md border-gray-600 border-2 text-gray-300 px-8 py-4 rounded-full hover:bg-gray-700 hover:border-gray-500 transition duration-300 font-medium">Get a Call</div></li>
              </Link>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white">Create Your Digital Menu <br />in Just 3 clicks</h2>
          <p className="text-2xl font-bold text-yellow-400 mb-10 max-w-2xl mx-auto">
            Create a free QR menu for your business for free now
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={"/signup"}>
              <button className="inline-flex border-2 border-yellow-400 items-center justify-center px-8 py-3 text-lg font-medium rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:border-yellow-300 transition duration-300">
                Try DineIn for free 
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>

            <Link to={"/signup"}>
              <button className="inline-flex border-2 border-gray-600 items-center justify-center px-8 py-3 text-lg font-medium rounded-full bg-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition duration-300">
                See Sample Menus 
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">How It Works</h3>
          <div className="max-w-3xl mx-auto">
            <Step number={1} title="Sign Up" description="Create your free account in seconds." />
            <Step number={2} title="Create Menu" description="Add your menu items quickly and easily." />
            <Step number={3} title="Customize QR" description="Choose a design that fits your brand." />
            <Step number={4} title="Share" description="Print or display your QR code for customers." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 DineIn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

interface step{
    number:number,
    title:string,
    description:string
}

function Step({ number, title, description }:step) {
  return (
    <div className="flex items-start mb-8">
      <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg mr-4">
        {number}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2 text-white">{title}</h4>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  )
}

