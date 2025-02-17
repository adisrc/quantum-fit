import React, { useState } from "react";

const BMI = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert cm to meters
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBMI(bmiValue);

      if (bmiValue < 18.5) {
        setCategory("Underweight");
      } else if (bmiValue < 24.9) {
        setCategory("Normal weight");
      } else if (bmiValue < 29.9) {
        setCategory("Overweight");
      } else {
        setCategory("Obese");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-xl flex flex-col md:flex-row items-center text-white">
      {/* Left Side - Input Form */}
      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-3xl font-bold mb-4">Calculate Your BMI</h2>
        <p className="text-gray-300 mb-6">Enter your details to check your BMI.</p>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 outline-none"
          />
        </div>

        <button
          onClick={calculateBMI}
          className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg hover:scale-105 transition transform"
        >
          Calculate BMI
        </button>
      </div>

      {/* Right Side - Result Display */}
      <div className="w-full md:w-1/2 p-6 flex flex-col items-center">
        <div className="bg-gray-900 p-6 rounded-2xl w-80 text-center shadow-lg">
          <h3 className="text-xl font-semibold mb-3">Your BMI</h3>
          {bmi ? (
            <>
              <p className="text-5xl font-bold">
                {bmi}
              </p>
              <p
                className={`mt-3 px-4 py-2 rounded-lg text-lg font-semibold ${
                  category === "Underweight"
                    ? "bg-yellow-500 text-black"
                    : category === "Normal weight"
                    ? "bg-green-500 text-white"
                    : category === "Overweight"
                    ? "bg-orange-500 text-black"
                    : "bg-red-600 text-white"
                }`}
              >
                {category}
              </p>
            </>
          ) : (
            <p className="text-gray-400">Enter your details to see the result</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMI;
