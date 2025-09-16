'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Shield, Lock, ArrowLeft, Check, Zap, CreditCard, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import Banner from '@/components/Banner'
import { planConfig } from '@/lib/config'

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [whopLoaded, setWhopLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const planId = params?.plan as string

  useEffect(() => {
    // Validate plan
    if (!planId || planId !== planConfig.id) {
      router.replace('/pricing')
      return
    }

    // Load Whop checkout script
    const script = document.createElement('script')
    script.src = 'https://js.whop.com/static/checkout/loader.js'
    script.async = true
    script.onload = () => {
      setWhopLoaded(true)
      setIsLoading(false)
    }
    script.onerror = () => {
      setError('Failed to load checkout. Please try again.')
      setIsLoading(false)
    }

    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [planId, router])

  if (!planId || planId !== planConfig.id) {
    return null
  }

  const trustIndicators = [
    { icon: <Shield className="w-5 h-5" />, text: 'SSL Secured Checkout' },
    { icon: <Lock className="w-5 h-5" />, text: '256-bit Encryption' },
    { icon: <RefreshCw className="w-5 h-5" />, text: '30-Day Refund Policy' },
    { icon: <Zap className="w-5 h-5" />, text: 'Instant Access' }
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Pricing */}
        <div className="mb-8">
          <Link
            href="/pricing"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Pricing
          </Link>
        </div>

        {/* Banner */}
        <div className="mb-12">
          <Banner height="medium" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Plan Summary */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-4 border-b border-gray-800">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{planConfig.name}</h3>
                    <p className="text-gray-400">Monthly subscription</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">${planConfig.price}</div>
                    <div className="text-gray-400 text-sm">per month</div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">What's Included:</h4>
                <ul className="space-y-3">
                  {planConfig.features.slice(0, 6).map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Indicators */}
              <div className="border-t border-gray-800 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  {trustIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-400">
                      {indicator.icon}
                      <span className="text-sm">{indicator.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
                <p className="text-red-200 text-sm text-center">
                  <span className="font-semibold">Limited Time:</span> 30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-white">Secure Checkout</h2>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-600 rounded-lg">
                  <p className="text-red-200">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 text-red-400 hover:text-red-300 underline"
                  >
                    Try again
                  </button>
                </div>
              )}

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center space-x-3 text-gray-400">
                    <div className="w-6 h-6 border-2 border-gray-600 border-t-red-500 rounded-full animate-spin" />
                    <span>Loading secure checkout...</span>
                  </div>
                </div>
              ) : whopLoaded ? (
                <div>
                  <div
                    data-whop-checkout-plan-id={planConfig.productId}
                    data-whop-checkout-theme="dark"
                    data-whop-checkout-success-url={`${window.location.origin}/login`}
                    className="min-h-[400px]"
                  />

                  <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm mb-4">
                      By completing your purchase, you agree to our Terms of Service and Privacy Policy
                    </p>
                    <div className="flex items-center justify-center space-x-6 text-gray-500 text-xs">
                      <span>Powered by Whop</span>
                      <span>•</span>
                      <span>Secure Payment Processing</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">Having trouble loading checkout?</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Reload Page
                  </button>
                </div>
              )}

              {/* Security Notice */}
              <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Your information is secure</h4>
                    <p className="text-gray-400 text-sm">
                      We use bank-level 256-bit SSL encryption to protect your personal and payment information.
                      Your data is never stored on our servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Trust Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Join 15,000+ Satisfied Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">4.9★</div>
              <p className="text-gray-400">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">95%</div>
              <p className="text-gray-400">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">30-Day</div>
              <p className="text-gray-400">Money-Back Guarantee</p>
            </div>
          </div>
        </div>

        {/* Direct Whop purchase link */}
        <div className="mt-12 text-center border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-400 mb-2">
            Or you can purchase directly on Whop:
          </p>
          <Link
            href="https://whop.com/forgefit-club/forgefit-elite-membership/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 underline text-sm transition-colors"
          >
            Purchase on Whop →
          </Link>
        </div>
      </div>
    </div>
  )
}