import Link from 'next/link'
import Banner from '@/components/Banner'
import {
  Dumbbell,
  Users,
  Target,
  Trophy,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Zap
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: <Dumbbell className="w-8 h-8 text-red-500" />,
      title: 'Elite Training Programs',
      description: 'Access cutting-edge workout routines designed by professional trainers. From strength building to HIIT, we&apos;ve got programs that deliver real results.'
    },
    {
      icon: <Target className="w-8 h-8 text-red-500" />,
      title: 'Personalized Nutrition',
      description: 'Get custom meal plans tailored to your goals, dietary preferences, and lifestyle. Fuel your body for maximum performance and recovery.'
    },
    {
      icon: <Users className="w-8 h-8 text-red-500" />,
      title: 'Community Support',
      description: 'Join a thriving community of fitness enthusiasts. Share your journey, get motivation, and celebrate victories together in our exclusive forums.'
    },
    {
      icon: <Trophy className="w-8 h-8 text-red-500" />,
      title: 'Expert Coaching',
      description: 'Connect with certified personal trainers and nutritionists. Get personalized advice, form corrections, and accountability to reach your goals faster.'
    },
    {
      icon: <Clock className="w-8 h-8 text-red-500" />,
      title: 'Progress Tracking',
      description: 'Monitor your transformation with detailed analytics. Track workouts, nutrition, measurements, and see your progress visualized over time.'
    },
    {
      icon: <Zap className="w-8 h-8 text-red-500" />,
      title: 'Mobile App Access',
      description: 'Take your workouts anywhere with our premium mobile app. Download workouts offline and never miss a training session.'
    }
  ]

  const stats = [
    { number: '127', label: 'Active Members' },
    { number: '89', label: 'Workout Programs' },
    { number: '95%', label: 'Success Rate' },
    { number: '24/7', label: 'Support Available' }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      content: 'ForgeFit transformed my approach to fitness. The personalized programs and community support helped me achieve goals I never thought possible.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Busy Professional',
      content: 'Finally found a fitness program that fits my schedule. The mobile app and flexible workouts make staying consistent so much easier.',
      rating: 5
    },
    {
      name: 'Jessica Davis',
      role: 'New Mom',
      content: 'The nutrition guidance and supportive community helped me regain my strength and confidence after having my baby. Absolutely life-changing!',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Banner */}
      <section className="relative overflow-hidden py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Banner height="large" priority className="mb-8" />
        </div>
        <div className="hero-gradient py-12">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Transform Your Body,{' '}
                <span className="gradient-text">Forge Your Strength</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl">
                Join the ultimate fitness community and unlock your full potential with expert guidance,
                proven programs, and personalized nutrition plans that deliver real results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pricing"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 glow-red flex items-center justify-center group"
                >
                  Start Your Transformation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#features"
                  className="border-2 border-gray-600 hover:border-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools, guidance, and support
              you need to achieve your fitness goals and maintain a healthy lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 p-8 rounded-xl border border-gray-800 card-hover group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Built by Fitness <span className="gradient-text">Experts</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                ForgeFit Club was founded by a team of certified trainers, nutritionists,
                and fitness enthusiasts who understand the challenges of building a
                sustainable fitness routine.
              </p>
              <div className="space-y-4">
                {[
                  'Over 10 years of combined fitness expertise',
                  'Thousands of successful transformations',
                  'Evidence-based training methodologies',
                  'Continuous program updates and improvements'
                ].map((point, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <span className="text-gray-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Start?</h3>
                <p className="text-red-100 mb-6">
                  Join thousands of members who have already transformed their lives
                </p>
                <Link
                  href="/pricing"
                  className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Hear from real members who have transformed their lives with ForgeFit Club
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900 p-8 rounded-xl border border-gray-800 card-hover"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Your Transformation Starts Today
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join ForgeFit Club and get instant access to everything you need to build
            the body and confidence you&apos;ve always wanted.
          </p>
          <Link
            href="/pricing"
            className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Start Your Journey Now
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}