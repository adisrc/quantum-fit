import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Target,
  Trophy,
  Users,
  Activity,
  Check,
  ArrowRight,
} from "lucide-react";

const AboutSection = () => {
  const navigate = useNavigate();

  const stats = [
    { number: "99%", label: "Accuracy in Rep Counting", icon: <Check className="w-6 h-6" /> },
    { number: "95%", label: "User Satisfaction", icon: <Heart className="w-6 h-6" /> },
    { number: "24/7", label: "AI-Powered Diet Suggestions", icon: <Heart className="w-6 h-6" /> },
    { number: "5s", label: "Avg. Setup Time", icon: <Users className="w-6 h-6" /> }
  ];

  const features = [
    "AI-powered rep counting using your camera",
    "Daily leaderboard to track top performers",
    "Personalized diet and nutrition suggestions",
    "Real-time progress tracking and analytics",
    "Connect with certified fitness trainers",
    "Community support and fitness challenges",
  ];

  return (
    <div className="w-full bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Elevate Your Fitness with
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}QuantFIT AI
            </span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Experience next-level workouts with **AI-driven rep counting**, daily leaderboards, and personalized diet plans.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-purple-600">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                {stat.number}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Why QuantFIT?</h2>
              <p className="text-gray-600 mb-6">
                QuantFIT leverages AI to count your reps in real-time, track your progress, 
                and provide tailored fitness recommendations. Whether you're a beginner or a pro, 
                our smart technology adapts to your needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/workout")}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate("/learn-more")}
                  className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Us?</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="text-gray-600">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <Heart className="w-6 h-6 text-purple-600" />
                AI Rep Counting
              </h3>
              <p className="text-gray-600 mb-4">
                Use your **camera** to track your reps and form **automatically**. 
                No need to count manually—just focus on your workout!
              </p>
              <a href="#" className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1">
                See AI in Action <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <Users className="w-6 h-6 text-purple-600" />
                Daily Leaderboards
              </h3>
              <p className="text-gray-600 mb-4">
                Compete with the **best**! Our **daily leaderboard** ranks users based on performance, consistency, and achievements.
              </p>
              <a href="#" className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1">
                View Leaderboard <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <Target className="w-6 h-6 text-purple-600" />
                Personalized Diet Plans
              </h3>
              <p className="text-gray-600 mb-4">
                Get **AI-generated meal plans** tailored to your fitness goals. Whether it's weight loss, muscle gain, or endurance training—we got you!
              </p>
              <a href="#" className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1">
                Get Your Plan <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;