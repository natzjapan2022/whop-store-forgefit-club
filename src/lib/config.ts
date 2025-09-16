import { PlanConfig } from '@/types'

export const planConfig: PlanConfig = {
  id: 'pro',
  name: 'ForgeFit Pro',
  price: 199,
  productId: process.env.NEXT_PUBLIC_WHOP_STARTER_PRODUCT_ID || 'plan_9kGNVSemYqrgU',
  features: [
    'Unlimited access to all workout programs',
    'Personalized nutrition plans',
    '24/7 community support',
    'Live coaching sessions',
    'Progress tracking & analytics',
    'Mobile app access',
    'Exclusive member content',
    'Priority customer support'
  ],
  popular: true
}

export const siteConfig = {
  name: 'ForgeFit Club',
  description: 'Transform your body, forge your strength. Join the ultimate fitness community.',
  logo: '/logo.png',
  fallbackLogo: '/logo.svg',
  contact: {
    address: '2150 N Central Expressway, Suite 200, Dallas, TX 75206',
    phone: '(214) 555-0147',
    email: 'support@forgefitclub.com',
    businessHours: 'Monday - Friday: 6:00 AM - 10:00 PM CST'
  }
}