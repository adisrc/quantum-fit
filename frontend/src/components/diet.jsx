import React, { useState } from 'react';
import { 
  ArrowRight, 
  Activity,
  Scale,
  Brain,
  Coffee,
  Cookie,
  UtensilsCrossed,
  Target,
  Dumbbell,
  Heart
} from 'lucide-react';

const DietSuggestionPage = () => {
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [dietary, setDietary] = useState('none');
  const [goal, setGoal] = useState('maintain');
  const [step, setStep] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const calculateBMR = () => {
    return Math.round(88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age));
  };

  const getCalorieNeeds = () => {
    const bmr = calculateBMR();
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    let calories = Math.round(bmr * multipliers[activityLevel]);
    if (goal === 'lose') calories -= 500;
    if (goal === 'gain') calories += 500;
    return calories;
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-2">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-8 h-8 border-2 rounded-full flex items-center justify-center ${
              step >= num ? 'border-black bg-black text-white' : 'border-gray-600 text-gray-600'
            }`}>
              {num}
            </div>
            {num < 3 && (
              <div className={`w-8 h-1 ${
                step > num ? 'bg-black' : 'bg-gray-400'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-8">
        <div className="border-2 border-gray-300 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6" />
            <h3 className="text-lg font-bold">Age: {age} years</h3>
          </div>
          <input
            type="range"
            min="18"
            max="80"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="border-2 border-gray-300 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-6 h-6" />
            <h3 className="text-lg font-bold">Weight: {weight} kg</h3>
          </div>
          <input
            type="range"
            min="40"
            max="150"
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="border-2 border-gray-300 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-6 h-6" />
            <h3 className="text-lg font-bold">Height: {height} cm</h3>
          </div>
          <input
            type="range"
            min="140"
            max="220"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      
      <button
        onClick={() => setStep(2)}
        className="w-full py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
      >
        Next Step
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="border-2 border-gray-300 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Dumbbell className="w-5 h-5" />
          Activity Level
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {['light', 'moderate', 'active'].map((level) => (
            <button
              key={level}
              onClick={() => setActivityLevel(level)}
              className={`p-4 rounded-lg border-2 flex items-center justify-center capitalize ${
                activityLevel === level
                  ? 'bg-black text-white border-black'
                  : 'border-gray-300 hover:border-gray-600'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="border-2 border-gray-300 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Dietary Preference
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {['none', 'vegetarian', 'vegan', 'keto'].map((pref) => (
            <button
              key={pref}
              onClick={() => setDietary(pref)}
              className={`p-4 rounded-lg border-2 flex items-center justify-center capitalize ${
                dietary === pref
                  ? 'bg-black text-white border-black'
                  : 'border-gray-300 hover:border-gray-600'
              }`}
            >
              {pref}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => setStep(3)}
          className="w-full py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
        >
          Next Step
        </button>
        <button
          onClick={() => setStep(1)}
          className="w-full py-4 bg-white border-2 border-gray-300 rounded-lg font-bold text-lg hover:border-gray-600 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="border-2 border-gray-300 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Your Goal
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            { id: 'lose', label: 'Lose Weight' },
            { id: 'maintain', label: 'Maintain Weight' },
            { id: 'gain', label: 'Gain Muscle' }
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => setGoal(g.id)}
              className={`p-4 rounded-lg border-2 flex items-center justify-center ${
                goal === g.id
                  ? 'bg-black text-white border-black'
                  : 'border-gray-300 hover:border-gray-600'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => {
            setShowSuggestions(true);
            setStep(1);
          }}
          className="w-full py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
        >
          Get Your Plan
        </button>
        <button
          onClick={() => setStep(2)}
          className="w-full py-4 bg-white border-2 border-gray-300 rounded-lg font-bold text-lg hover:border-gray-600 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-6">
      <div className="border-2 border-black p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Daily Calorie Target</h3>
        <div className="text-3xl font-bold">{getCalorieNeeds()} calories</div>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-gray-300 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="w-6 h-6" />
            <h3 className="text-lg font-bold">Breakfast</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              Oatmeal with berries
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              Greek yogurt
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              Almonds
            </li>
          </ul>
        </div>

        <div className="border-2 border-gray-300 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <UtensilsCrossed className="w-6 h-6" />
            <h3 className="text-lg font-bold">Lunch</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              Grilled chicken breast
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              Quinoa
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              Steamed vegetables
            </li>
          </ul>
        </div>

        <div className="border-2 border-gray-300 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Cookie className="w-6 h-6" />
            <h3 className="text-lg font-bold">Snacks</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              Protein smoothie
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              Mixed nuts
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              Fresh fruit
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      {!showSuggestions && (
        <>
          {renderStepIndicator()}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-2">
              {step === 1 ? 'Your Details' : 
               step === 2 ? 'Your Lifestyle' : 
               'Your Goals'}
            </h2>
          </div>
        </>
      )}
      
      {showSuggestions ? renderResults() :
       step === 1 ? renderStep1() :
       step === 2 ? renderStep2() :
       renderStep3()}
    </div>
  );
};

export default DietSuggestionPage;