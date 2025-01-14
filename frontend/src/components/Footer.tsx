import { FaFacebook, FaInstagram,FaWhatsappSquare } from "react-icons/fa"

interface FooterProps{
  weekdayHours:string,
  weekendHours:string,
  email:string,
  contact:string,
  instagram:string,
  facebook:string
}

const Footer:React.FC<FooterProps>= ({weekdayHours,weekendHours,email,contact,instagram,facebook}) => {
  return (
    <footer className="bg-black border-t-2 border-t-yellow-300 px-4 text-white py-10">
      <div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About Us */}

        <div>
          <h3 className="text-lg font-bold mb-4">ABOUT US</h3>
          <button onClick={()=>{
            const url = `https://www.instagram.com/${instagram}`
             window.open(url, '_blank');
          }} className="p-4">
            <FaInstagram size={33 } />
          </button>

          <button onClick={()=>{
            const url = `https://www.facebook.com/${facebook}`
             window.open(url, '_blank');
          }} className="p-4">
            <FaFacebook size={33} />
          </button>

          <button onClick={()=>{
            const url = `https://api.whatsapp.com/send?phone=${contact}`
             window.open(url,'_blank');
          }} className="p-4" >
            <FaWhatsappSquare size={33} />
          </button>


        </div>
       

        <div className="justify-items-center">
          <h3 className="text-lg font-bold mb-4">WORKING HOURS-</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-start gap-x-4">
              <span className="font-medium w-12">Sun:</span>
              <span className="text-gray-300">{weekendHours.toUpperCase()}</span>
            </li>
            <li className="flex items-center justify-start gap-x-4">
              <span className="font-medium w-12">Mon:</span>
              <span className="text-gray-300">{weekdayHours.toUpperCase()}</span>
            </li>
            <li className="flex items-center justify-start gap-x-4">
              <span className="font-medium w-12">Tue:</span>
              <span className="text-gray-300">{weekdayHours.toUpperCase()}</span>
            </li>
            <li className="flex items-center justify-start gap-x-4">
              <span className="font-medium w-12">Wed:</span>
              <span className="text-gray-300">{weekdayHours.toUpperCase()}</span>
            </li>
            <li className="flex items-center justify-start gap-x-4">
              <span className="font-medium w-12">Thu:</span>
              <span className="text-gray-300">{weekdayHours.toUpperCase()}</span>
            </li>
            <li className="flex items-center justify-start gap-x-4">
              <span className="font-medium w-12">Fri:</span>
              <span className="text-gray-300">{weekdayHours.toUpperCase()}</span>
            </li>
            <li className="flex items-center justify-start gap-x-4">
              <span className="font-medium w-12">Sat:</span>
              <span className="text-gray-300">{weekendHours.toUpperCase()}</span>
            </li>
          </ul>

        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-bold mb-4">CONTACT US</h3>
          <ul className="space-y-2">
            <button onClick={() => window.location.href = `tel:${contact}`}>
              <span className="inline-block mr-2">📱</span>
              +{contact}
            </button>
            <br></br>
            <button onClick={()=>{window.location.href=`mailto:${email}`}}>
              <span className="inline-block mr-2">📧</span>
              {email}
            </button>
            <li>
              <span className="inline-block mr-2">📍</span>
              GURUGRAM, IND
            </li>
          </ul>
        </div>

        

        {/* Opening Hours */}
        
      </div>
      <div className="bg-black py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <p>&copy; Designed and doveloped by DineInn</p>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
