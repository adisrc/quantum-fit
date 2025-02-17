import React from 'react';
import { 
  Heart, 
  Target, 
  Trophy, 
  Users, 
  Activity,
  Check,
  ArrowRight
} from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { number: "50K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "95%", label: "Success Rate", icon: <Trophy className="w-6 h-6" /> },
    { number: "200+", label: "Expert Trainers", icon: <Target className="w-6 h-6" /> },
    { number: "10M+", label: "Workouts Completed", icon: <Activity className="w-6 h-6" /> }
  ];

  const features = [
    "Personalized workout plans tailored to your goals",
    "Real-time progress tracking and analytics",
    "Connect with certified fitness trainers",
    "Nutrition guidance and meal planning",
    "Community support and challenges",
    "Integration with popular fitness devices"
  ];

  return (
    <div className="w-full bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your Life With
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Smart Fitness</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            We combine cutting-edge technology with proven fitness methodologies to help you achieve your health and wellness goals.
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
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                We believe that everyone deserves access to professional fitness guidance. 
                Our platform makes it easy to start your fitness journey, track your progress, 
                and achieve lasting results through smart technology and community support.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
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
                Personal Training
              </h3>
              <p className="text-gray-600 mb-4">
                Get matched with certified trainers who understand your goals and create 
                personalized workout plans that fit your schedule and preferences.
              </p>
              <a href="#" className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1">
                Meet our trainers <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <Users className="w-6 h-6 text-purple-600" />
                Community Support
              </h3>
              <p className="text-gray-600 mb-4">
                Join a supportive community of like-minded individuals. Share your progress, 
                participate in challenges, and celebrate achievements together.
              </p>
              <a href="#" className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1">
                Join our community <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;