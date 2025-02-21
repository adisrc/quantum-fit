import React from "react";

const Add = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-black">
          TRACK <span className="text-purple-600">EVERY REP</span> WITH PRECISION
        </h1>
      </div>
      
      {/* Features Section */}
      <div className="relative z-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-black">
        {/* Feature 1 */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <span className="text-4xl text-purple-600">📊</span>
          <h2 className="text-xl font-bold mt-2">Real-Time Motion Tracking</h2>
          <p className="text-sm mt-2 opacity-80">AI-powered motion analysis ensures accurate rep counting and posture correction.</p>
          <a href="#" className="mt-3 text-purple-600 font-semibold hover:underline">Learn More</a>
        </div>
        
        {/* Feature 2 */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <span className="text-4xl text-purple-600">🤖</span>
          <h2 className="text-xl font-bold mt-2">AI-Powered Insights</h2>
          <p className="text-sm mt-2 opacity-80">Personalized performance analytics to track progress and optimize workouts.</p>
          <a href="#" className="mt-3 text-purple-600 font-semibold hover:underline">Learn More</a>
        </div>
        
        {/* Feature 3 */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <span className="text-4xl text-purple-600">⚡</span>
          <h2 className="text-xl font-bold mt-2">No Wearables Needed</h2>
          <p className="text-sm mt-2 opacity-80">Simply use your camera – no extra devices required for accurate tracking.</p>
          <a href="#" className="mt-3 text-purple-600 font-semibold hover:underline">Learn More</a>
        </div>
      </div>
    </section>
  );
};

export default Add;