
const Footer = () => {
  return (
    <footer className="bg-black border-t-2 border-t-yellow-300 px-4 text-white py-10">
      <div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-bold mb-4">ABOUT US</h3>
          <p>
            We are dedicated to providing the best services to our customers.
            Your satisfaction is our priority.
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-bold mb-4">CONTACT US</h3>
          <ul className="space-y-2">
            <li>
              <span className="inline-block mr-2">📱</span>
              +919466444175
            </li>
            <li>
              <span className="inline-block mr-2">📧</span>
              dinein2003@gmail.com
            </li>
            <li>
              <span className="inline-block mr-2">📍</span>
              GURUGRAM, IND
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        {/* <div>
          <h3 className="text-lg font-bold mb-4">OPENING HOURS-</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Sun:</span>
              <span>11:00 AM - 08:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Mon:</span>
              <span>11:00 AM - 08:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Tue:</span>
              <span>11:00 AM - 08:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Wed:</span>
              <span>11:00 AM - 08:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Thu:</span>
              <span>11:00 AM - 08:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Fri:</span>
              <span>11:00 AM - 08:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sat:</span>
              <span>11:00 AM - 08:00 PM</span>
            </li>
          </ul>
        </div> */}
      </div>
      <footer className="bg-black py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 DineIn. All rights reserved.</p>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
