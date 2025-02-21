import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-pink-800 to-orange-300 text-white py-6 px-6 w-full  border-t-2">

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        
        {/* Logo & Tagline */}
        <div>
          <h1 className="text-3xl font-bold">QuantFit</h1>
          <p className="mt-2 text-sm">Transform your fitness journey with us!</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-200 transition">About Us</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <p>Email: <a href="mailto:info@keepfit.com" className="hover:underline">aditprakash.77@gmail.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a></p>
          <p>Address: </p>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="mt-8 flex justify-center space-x-6">
        <a href="#" className="text-2xl hover:scale-110 transition"><FaFacebook /></a>
        <a href="#" className="text-2xl hover:scale-110 transition"><FaInstagram /></a>
        <a href="#" className="text-2xl hover:scale-110 transition"><FaTwitter /></a>
        <a href="#" className="text-2xl hover:scale-110 transition"><FaLinkedin /></a>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-sm opacity-80">
        © {new Date().getFullYear()} QuantFit. All Rights Reserved.
      </div>
    </footer>
  );
}
