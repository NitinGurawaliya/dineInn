
import { Link } from 'react-router-dom';
import { ArrowRight} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100  pt-2 text-gray-900">
      {/* Header */}
      <header className="py-2 border-b-1 border-gray-200">
        <div className="container mx-auto  px-4 flex justify-between items-center">
          <h1 className="text-5xl font-bold  text-yellow-400">DineInn</h1>
          <nav className=''> 
            <ul className="flex space-x-6">

           
              

              <Link to={"/signup"}>
                <li><button  className="bg-teal-400 border-2 text-gray-900 px-8 py-4 rounded-full hover:bg-white transition duration-300">Sign Up</button> </li>
              </Link>
              
              <Link to={"/signin"} >
                <li><div  className="bg-white text-md border-yellow-400 border-2 text-gray-900 px-8 py-4 rounded-full hover:bg-yellow-300 transition duration-300"> Login</div></li>
              </Link>

              <Link to={"/"} >
                <li><div  className="bg-black text-md  border-2 text-white px-8 py-4 rounded-full  transition duration-300"> Get a Call</div></li>
              </Link>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className=" text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Create Your Digital Menu <br />in Just 3 clicks</h2>
          <p className="text-2xl font-bold text-yellow-400 mb-10 max-w-2xl mx-auto">
            Create a free Qr menu for your business for free now
          </p>
          <Link to={"/signup"}>
          <a
            href="#"
            className="inline-flex border-2 border-gray-500 items-center justify-center px-8 py-3 text-lg hover:border-0 font-medium rounded-full bg-white text-gray-900 hover:bg-yellow-300 transition duration-300"
          >
            Try DineIn for free 
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          </Link>

          <Link to={"/signup"}>
          <a
            href="#"
            className="inline-flex border-2 ml-2 border-gray-500 items-center justify-center px-8 py-3 text-lg hover:border-0 font-medium rounded-full bg-white text-gray-900 hover:bg-yellow-300 transition duration-300"
          >
            See Sample Menus 
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          </Link>
        </div>
      </section>

  

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="max-w-3xl mx-auto">
            <Step number={1} title="Sign Up" description="Create your free account in seconds." />
            <Step number={2} title="Create Menu" description="Add your menu items quickly and easily." />
            <Step number={3} title="Customize QR" description="Choose a design that fits your brand." />
            <Step number={4} title="Share" description="Print or display your QR code for customers." />
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-800 py-8">
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
      <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg mr-4">
        {number}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  )
}

