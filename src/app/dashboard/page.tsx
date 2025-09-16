'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Dumbbell,
  Heart,
  Trophy,
  Target,
  Clock,
  CheckCircle,
  Play,
  Lock,
  Award,
  Calendar,
  Users,
  Activity,
  Zap,
  TrendingUp,
  Apple
} from 'lucide-react';

interface Workout {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  locked: boolean;
}

interface Program {
  id: string;
  title: string;
  description: string;
  workouts: number;
  duration: string;
  completed: boolean;
  locked: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProgram, setActiveProgram] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem('userSession');
    if (session) {
      const sessionData = JSON.parse(session);
      const now = Date.now();

      if (sessionData.expiresAt > now) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('userSession');
        router.replace('/login');
        return;
      }
    } else {
      router.replace('/login');
      return;
    }

    setIsLoading(false);
  }, [router]);

  const programs: Program[] = [
    {
      id: 'strength-foundation',
      title: 'Strength Foundation',
      description: 'Build a solid foundation with fundamental strength training exercises.',
      workouts: 12,
      duration: '4 weeks',
      completed: false,
      locked: false
    },
    {
      id: 'muscle-building',
      title: 'Muscle Building Program',
      description: 'Progressive overload training designed to maximize muscle growth.',
      workouts: 16,
      duration: '6 weeks',
      completed: false,
      locked: false
    },
    {
      id: 'fat-loss-blast',
      title: 'Fat Loss Blast',
      description: 'High-intensity workouts combined with metabolic training.',
      workouts: 14,
      duration: '5 weeks',
      completed: false,
      locked: false
    },
    {
      id: 'athletic-performance',
      title: 'Athletic Performance',
      description: 'Sport-specific training to enhance athletic capabilities.',
      workouts: 18,
      duration: '8 weeks',
      completed: false,
      locked: true
    },
    {
      id: 'powerlifting-prep',
      title: 'Powerlifting Prep',
      description: 'Competition preparation for squat, bench, and deadlift.',
      workouts: 20,
      duration: '10 weeks',
      completed: false,
      locked: true
    },
    {
      id: 'advanced-bodybuilding',
      title: 'Advanced Bodybuilding',
      description: 'Advanced techniques for experienced lifters seeking maximum gains.',
      workouts: 24,
      duration: '12 weeks',
      completed: false,
      locked: true
    }
  ];

  const strengthFoundationWorkouts: Workout[] = [
    { id: '1', title: 'Full Body Introduction', description: 'Basic movements and form', duration: '45min', difficulty: 'Beginner', completed: false, locked: false },
    { id: '2', title: 'Upper Body Focus', description: 'Push and pull movements', duration: '50min', difficulty: 'Beginner', completed: false, locked: false },
    { id: '3', title: 'Lower Body Power', description: 'Squats and hip hinges', duration: '48min', difficulty: 'Beginner', completed: false, locked: false },
    { id: '4', title: 'Core Stability', description: 'Functional core training', duration: '35min', difficulty: 'Beginner', completed: false, locked: false },
    { id: '5', title: 'Movement Patterns', description: 'Compound movement practice', duration: '52min', difficulty: 'Beginner', completed: false, locked: true },
    { id: '6', title: 'Progressive Overload', description: 'Adding weight and intensity', duration: '55min', difficulty: 'Intermediate', completed: false, locked: true },
    { id: '7', title: 'Upper Body Strength', description: 'Building pressing power', duration: '48min', difficulty: 'Intermediate', completed: false, locked: true },
    { id: '8', title: 'Lower Body Power', description: 'Explosive leg movements', duration: '50min', difficulty: 'Intermediate', completed: false, locked: true },
    { id: '9', title: 'Full Body Integration', description: 'Combining all movements', duration: '58min', difficulty: 'Intermediate', completed: false, locked: true },
    { id: '10', title: 'Strength Assessment', description: 'Testing your progress', duration: '45min', difficulty: 'Intermediate', completed: false, locked: true },
    { id: '11', title: 'Advanced Variations', description: 'Complex movement patterns', duration: '60min', difficulty: 'Advanced', completed: false, locked: true },
    { id: '12', title: 'Foundation Mastery', description: 'Final strength challenge', duration: '55min', difficulty: 'Advanced', completed: false, locked: true }
  ];

  const muscleBuildingWorkouts: Workout[] = [
    { id: '1', title: 'Hypertrophy Basics', description: 'Understanding muscle growth', duration: '50min', difficulty: 'Beginner', completed: false, locked: false },
    { id: '2', title: 'Push Day Fundamentals', description: 'Chest, shoulders, triceps', duration: '55min', difficulty: 'Beginner', completed: false, locked: false },
    { id: '3', title: 'Pull Day Power', description: 'Back and bicep development', duration: '52min', difficulty: 'Beginner', completed: false, locked: false },
    { id: '4', title: 'Leg Day Launch', description: 'Quad and glute focus', duration: '58min', difficulty: 'Beginner', completed: false, locked: false },
    { id: '5', title: 'Upper Body Volume', description: 'High volume training', duration: '60min', difficulty: 'Intermediate', completed: false, locked: true },
    { id: '6', title: 'Lower Body Mass', description: 'Building leg muscle', duration: '62min', difficulty: 'Intermediate', completed: false, locked: true }
  ];

  const fatLossWorkouts: Workout[] = [
    { id: '1', title: 'HIIT Introduction', description: 'High intensity basics', duration: '25min', difficulty: 'Beginner', completed: false, locked: false },
    { id: '2', title: 'Metabolic Circuit', description: 'Fat burning circuits', duration: '30min', difficulty: 'Beginner', completed: false, locked: false },
    { id: '3', title: 'Cardio Strength Combo', description: 'Combining cardio and weights', duration: '35min', difficulty: 'Beginner', completed: false, locked: false },
    { id: '4', title: 'Tabata Training', description: '4-minute fat burners', duration: '20min', difficulty: 'Intermediate', completed: false, locked: false },
    { id: '5', title: 'Full Body HIIT', description: 'Complete body conditioning', duration: '40min', difficulty: 'Intermediate', completed: false, locked: true }
  ];

  const getWorkoutsForProgram = (programId: string): Workout[] => {
    switch (programId) {
      case 'strength-foundation':
        return strengthFoundationWorkouts;
      case 'muscle-building':
        return muscleBuildingWorkouts;
      case 'fat-loss-blast':
        return fatLossWorkouts;
      default:
        return [];
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-600 bg-green-100';
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'Advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Dashboard Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">Fitness Dashboard</h1>
              <p className="text-blue-100 text-xl">
                Welcome back! Time to forge your fitness journey.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg border border-white/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Dumbbell className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Workouts Completed</p>
                  <p className="text-2xl font-bold text-gray-900">0/84</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Progress</p>
                  <p className="text-2xl font-bold text-gray-900">8%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hours Trained</p>
                  <p className="text-2xl font-bold text-gray-900">3.2h</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Trophy className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Achievements</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </div>
          </div>

          {/* Training Programs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Training Programs</h2>
                <p className="text-gray-600">
                  Comprehensive fitness programs designed to help you reach your goals
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {programs.map((program) => (
                    <div
                      key={program.id}
                      className={`border rounded-lg transition-all ${
                        activeProgram === program.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div
                        className="p-4 cursor-pointer"
                        onClick={() => setActiveProgram(activeProgram === program.id ? null : program.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${
                              program.completed ? 'bg-green-100' : program.locked ? 'bg-gray-100' : 'bg-blue-100'
                            }`}>
                              {program.completed ? (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                              ) : program.locked ? (
                                <Lock className="w-6 h-6 text-gray-400" />
                              ) : (
                                <Dumbbell className="w-6 h-6 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{program.title}</h3>
                              <p className="text-sm text-gray-600">{program.description}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-sm text-gray-500">{program.workouts} workouts</span>
                                <span className="text-sm text-gray-500">{program.duration}</span>
                              </div>
                            </div>
                          </div>
                          {program.locked && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              Locked
                            </span>
                          )}
                        </div>
                      </div>

                      {activeProgram === program.id && !program.locked && (
                        <div className="border-t bg-gray-50 p-4">
                          <div className="space-y-3">
                            {getWorkoutsForProgram(program.id).map((workout) => (
                              <div
                                key={workout.id}
                                className={`flex items-center justify-between p-3 rounded-lg ${
                                  workout.locked ? 'bg-gray-100' : 'bg-white border'
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    workout.completed ? 'bg-green-100' : workout.locked ? 'bg-gray-100' : 'bg-blue-100'
                                  }`}>
                                    {workout.completed ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : workout.locked ? (
                                      <Lock className="w-4 h-4 text-gray-400" />
                                    ) : (
                                      <Play className="w-4 h-4 text-blue-600" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className={`font-medium ${workout.locked ? 'text-gray-400' : 'text-gray-900'}`}>
                                      {workout.title}
                                    </p>
                                    <p className="text-sm text-gray-500">{workout.description}</p>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <span className="text-sm text-gray-500">{workout.duration}</span>
                                      <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(workout.difficulty)}`}>
                                        {workout.difficulty}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {!workout.locked && (
                                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    {workout.completed ? 'Replay' : 'Start'}
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fitness Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Fitness Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-semibold text-orange-600">7 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weekly Goals</span>
                  <span className="font-semibold text-blue-600">4/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Calories Burned</span>
                  <span className="font-semibold text-red-600">1,240</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Personal Records</span>
                  <span className="font-semibold text-purple-600">12</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Completed: Full Body Introduction</p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Dumbbell className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Started: Upper Body Focus</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Earned: First Week Badge</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nutrition Tracker */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Nutrition</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Apple className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-600">Calories</span>
                  </div>
                  <span className="text-sm font-medium">1,850 / 2,200</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <p className="text-gray-500">Protein</p>
                    <p className="font-medium">85g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Carbs</p>
                    <p className="font-medium">205g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Fat</p>
                    <p className="font-medium">62g</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">134 Active Members</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">89 Workouts This Week</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-600">17 Transformation Stories</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}