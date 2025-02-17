import React from "react";
import Footer from "../components/footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Leaderboard from "../components/leaderboard";
import BMI from "../components/BMI";

const Hero = () => {
  const images = [
    { url: "../images/feature1.jpeg", text: "Calorie Tracker" },
    { url: "../images/feature2.png", text: "Exercise Counter" },
    { url: "../images/feature3.webp", text: "Leaderboard"},
   
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <>
    <div className="flex flex-col min-h-screen pb-20">
      
      
      <main className="flex-grow flex flex-col items-center justify-center text-white">
        {/* Slideshow */}
        <div className="w-full relative">
          <Slider {...settings}>
            {images.map((item, index) => (
              <div key={index} className="relative h-[500px]">
                <img
                  src={item.url}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <h2 className="text-3xl md:text-5xl font-bold">{item.text}</h2>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Call to Action */}
<div className="text-center mt-3 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent text-2xl font-bold">
          <h1 className="text-6xl font-bold font-serif">Welcome to QuantFit</h1>
          <p className="mt-2 text-xl font-mono text-black
          ">Join us and start your fitness journey today!</p>
          <button className="mt-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition">
            Get Started
          </button>
        </div>
        <div className="mt-10 w-full flex justify-center">
{/* section */}
<section className="relative  w-full flex items-center justify-center bg-gradient-to-r from-purple-900 via-purple-600 to-orange-400">
      <div className="container  mx-auto flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Side Content */}
        <div className="max-w-lg text-white">
          <h1 className="text-4xl md:text-7xl font-bold">
            Track Your <span className="text-yellow-400">Progress</span> Daily!
          </h1>
          <p className="mt-4 text-xl opacity-80">
            Stay motivated and challenge yourself with our daily leaderboard.
            Compete with your friends and push your limits!
          </p>
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition">
            Join the Competition
          </button>
        </div>

        {/* Right Side - Leaderboard */}
        <div className="relative m-4 bg-white/10 rounded-3xl p-6 shadow-lg backdrop-blur-lg">
          <Leaderboard />
        </div>

      </div>
    </section>
    
  </div>
  <div className="mt-10 w-full flex justify-center">
  <section className="relative w-full flex items-center justify-center bg-gradient-to-r from-purple-900 via-purple-600 to-orange-400">
  <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
    
    {/* Left Side - BMI Form */}
    <div className="relative m-4 bg-white/10 rounded-3xl p-6 shadow-lg backdrop-blur-lg w-full lg:w-1/2">
      <BMI />
    </div>

    {/* Right Side - Text Content */}
    <div className="max-w-lg text-white text-center lg:text-left lg:ml-10">
      <h1 className="text-4xl md:text-7xl font-bold">
        Track Your <span className="text-yellow-400">Progress</span> Daily!
      </h1>
      <p className="mt-4 text-xl opacity-80">
        Stay motivated and challenge yourself with our daily leaderboard.
        Compete with your friends and push your limits!
      </p>
      <button className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition">
        Join the Competition
      </button>
    </div>

  </div>
</section>
</div>
      </main>

      
    </div>
    <Footer />
    </>
  );
};

export default Hero;
