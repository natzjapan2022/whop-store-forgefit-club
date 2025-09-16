import Link from 'next/link'
import Banner from '@/components/Banner'
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react'
import { planConfig } from '@/lib/config'

export default function PricingPage() {
  const benefits = [
    'Transform your body with proven programs',
    'Get personalized nutrition guidance',
    'Join an exclusive fitness community',
    'Access to mobile app and offline content',
    'Expert coaching and form corrections',
    'Track your progress with detailed analytics'
  ]

  const faqs = [
    {
      question: 'What&apos;s included in ForgeFit Pro?',
      answer: 'You get unlimited access to all workout programs, personalized nutrition plans, 24/7 community support, live coaching sessions, progress tracking, mobile app access, and priority support.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You&apos;ll continue to have access until the end of your billing period.'
    },
    {
      question: 'Is there a money-back guarantee?',
      answer: 'We offer a 30-day money-back guarantee. If you&apos;re not satisfied with your results, we&apos;ll refund your payment.'
    },
    {
      question: 'Do you offer beginner programs?',
      answer: 'Absolutely! We have programs for all fitness levels, from complete beginners to advanced athletes. Our system adapts to your current fitness level.'
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Start Your <span className="gradient-text">Transformation</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join ForgeFit Club and get instant access to everything you need to build
            the body and confidence you&apos;ve always wanted.
          </p>
          <div className="flex items-center justify-center space-x-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
            ))}
            <span className="ml-2 text-gray-400">4.9/5 from 127 members</span>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Banner height="medium" className="mb-8" />
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold flex items-center">
                <Crown className="w-4 h-4 mr-2" />
                Most Popular
              </div>
            </div>

            <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-12 border-2 border-red-500 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-10 rounded-full transform translate-x-16 -translate-y-16" />

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {planConfig.name}
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Everything you need to transform your fitness journey
                  </p>
                  <div className="flex items-center justify-center mb-6">
                    <span className="text-5xl font-bold text-white">${planConfig.price}</span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    30-day money-back guarantee • Cancel anytime
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Zap className="w-5 h-5 text-red-500 mr-2" />
                      What&apos;s Included
                    </h3>
                    <ul className="space-y-3">
                      {planConfig.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Why Choose ForgeFit?
                    </h3>
                    <ul className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    href={`/checkout/${planConfig.id}`}
                    className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 glow-red group"
                  >
                    Get Instant Access
                    <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <p className="text-sm text-gray-400 mt-4">
                    Secure checkout • Instant access • 30-day guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Thousands of Fitness Enthusiasts
            </h2>
            <p className="text-gray-400">
              Join our community of successful transformations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">15,000+</div>
              <div className="text-gray-400">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">200+</div>
              <div className="text-gray-400">Workout Programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">4.9★</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Everything you need to know about ForgeFit Club
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join 127 members who have already started their fitness journey
          </p>
          <Link
            href={`/checkout/${planConfig.id}`}
            className="inline-flex items-center bg-white text-red-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors group"
          >
            Start Your Transformation
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}