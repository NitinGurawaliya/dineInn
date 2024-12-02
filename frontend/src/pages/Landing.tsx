import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MousePointerClick, Smartphone, QrCode } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 pt-2 text-gray-100">
      {/* Header */}
      <header className="py-2  border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-5xl font-bold  text-yellow-400">DineInn</h1>
          <nav> 
            <ul className="flex space-x-6">
              <Link to={"/signup"}>
                <li><button  className="bg-yellow-400 border-2 text-gray-900 px-8 py-4 rounded-full hover:bg-white transition duration-300">Sign Up</button> </li>
              </Link>
              
              <Link to={"/signin"} >
                <li><div  className="bg-white text-md border-yellow-400 border-2 text-gray-900 px-8 py-4 rounded-full hover:bg-yellow-300 transition duration-300"> Login</div></li>
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
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-full bg-white text-gray-900 hover:bg-yellow-300 transition duration-300"
          >
            Try DineIn for free 
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose MenuQR?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<MousePointerClick />}
              title="3-4 Clicks"
              description="Create your digital menu with just a few clicks. It's that simple!"
            />
            <FeatureCard
              icon={<Clock />}
              title="2 Minutes"
              description="Your digital menu will be ready in less than 2 minutes. Save time and effort!"
            />
            <FeatureCard
              icon={<QrCode />}
              title="Custom QR Codes"
              description="Choose from our top-notch designs to create a unique QR code for your restaurant."
            />
            <FeatureCard
              icon={<Smartphone />}
              title="100% Free"
              description="No hidden fees, no credit card required. Create and use your digital menu for free, forever."
            />
          </div>
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

      {/* CTA Section */}
      <section className="py-20 bg-yellow-400 text-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Go Digital?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of restaurants that have already modernized their menus with MenuQR. It's free, fast, and incredibly easy to use.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-full bg-gray-900 text-yellow-400 hover:bg-gray-800 transition duration-300"
          >
            Create Your Menu Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
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

interface featuresCard {
icon:React.ReactElement,
title:string,
description:string

}
function FeatureCard({ icon, title, description }:featuresCard) {
  return (
    <div className="bg-gray-700 rounded-lg p-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4 text-gray-900">
        {React.cloneElement(icon, { className: "h-8 w-8" })}
      </div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-gray-400">{description}</p>
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

