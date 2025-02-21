import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { User, Clock, Dumbbell, Flame, Calendar, Scale, Ruler, Activity, Target } from "lucide-react";
import { useWorkout } from "../contexts/WorkoutContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Profile() {
  const { userData, user } = useWorkout();

  if (!user) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  // Format duration to minutes and seconds
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}m ${seconds.toFixed(1)}s`;
  };

  // Calculate BMI
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const bmi = calculateBMI(userData?.user?.weight, userData?.user?.height);

  // Get BMI category
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-500' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500' };
    return { category: 'Obese', color: 'text-red-500' };
  };

  const bmiStatus = getBMICategory(bmi);

  // Prepare workout data for chart
  const chartData = userData?.user?.workouts?.map(workout => ({
    date: new Date(workout.timestamp).toLocaleDateString(),
    reps: workout.reps,
    duration: workout.duration
  })) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
              <User size={48} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
              <p className="text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Active Streak: {userData?.user?.streak || 0} days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Activity className="text-purple-600 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fitness Score</p>
                    <p className="text-2xl font-bold">{userData?.user?.totalReps * 2}</p>
                  </div>
                </div>
                <Target className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Scale className="text-blue-600 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">BMI</p>
                    <p className="text-2xl font-bold">{bmi}</p>
                    <p className={`text-sm ${bmiStatus.color}`}>{bmiStatus.category}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Dumbbell className="text-green-600 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Reps</p>
                    <p className="text-2xl font-bold">{userData?.user?.totalReps || 0}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workout Progress Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Workout Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="reps" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Workout History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData?.user?.workouts?.map((workout) => (
                <div key={workout._id} 
                     className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-white hover:from-purple-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Dumbbell size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{workout.workoutType}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(workout.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-purple-600">{workout.reps} reps</p>
                    <p className="text-sm text-gray-500">{formatDuration(workout.duration)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}