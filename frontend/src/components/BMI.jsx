import React, { useState } from "react";
import { motion } from "framer-motion"; // For smooth animations

const BMI = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
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
    <div className="max-w-3xl mx-auto p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl backdrop-blur-lg border border-gray-600 flex flex-col items-center text-white">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-center mb-4">BMI Calculator</h2>

      {/* Form Section */}
      <div className="w-full flex flex-col gap-6">
        <div>
          <label className="block text-gray-300 mb-2 text-lg">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-lg"
            placeholder="Enter your weight"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 text-lg">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-lg"
            placeholder="Enter your height"
          />
        </div>

        <button
          onClick={calculateBMI}
          className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Calculate BMI
        </button>
      </div>

      {/* Result Section */}
      {bmi && (
        <motion.div 
          className="mt-8 w-full bg-gray-900 p-6 rounded-2xl text-center shadow-lg border border-gray-600"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-3">Your BMI</h3>
          <p className="text-5xl font-bold">{bmi}</p>
          <p
            className={`mt-4 px-6 py-3 rounded-xl text-lg font-semibold ${
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
        </motion.div>
      )}
    </div>
  );
};

export default BMI;
