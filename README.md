# ForgeFit Club - Fitness Website

A modern, responsive fitness website built with Next.js 14, TypeScript, and Tailwind CSS. Features a dark theme with black and red color scheme, Whop integration for payments, and a comprehensive admin dashboard.

## Features

- **Modern Design**: Dark theme with black and red color scheme
- **Responsive**: Works perfectly on all devices
- **Whop Integration**: Seamless checkout and payment processing
- **Admin Dashboard**: Complete user management system with localStorage persistence
- **Authentication**: Secure admin login with session management
- **Dynamic Content**: Customizable data columns and user management

## Pages

- **Landing Page**: Hero section, features, testimonials, and CTAs
- **Pricing Page**: Single tier pricing with Whop integration
- **Login Page**: User authentication interface
- **Checkout**: Dynamic checkout with Whop integration
- **Admin Portal**: Secure user management dashboard

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Payments**: Whop Integration
- **Deployment**: Vercel-ready

## Environment Variables

Create a `.env` file with the following variables:

```env
# Whop Product Configuration
NEXT_PUBLIC_WHOP_STARTER_PRODUCT_ID=plan_9kGNVSemYqrgU

# Admin Authentication
NEXT_PUBLIC_ADMIN_USERNAME=whop_admin_2024
NEXT_PUBLIC_ADMIN_PASSWORD=WhopSecure2024Admin
```

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set up Environment Variables**:
   - Copy `.env.example` to `.env`
   - Update the Whop product ID with your actual product ID
   - Admin credentials are pre-configured

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## Admin Access

- **URL**: `/admin/login`
- **Username**: `whop_admin_2024`
- **Password**: `WhopSecure2024Admin`

The admin dashboard includes:
- User management (CRUD operations)
- Dynamic column management
- Data export functionality
- Session management (24-hour expiration)
- localStorage persistence (no database required)

## Logo Setup

To add your custom logo:
1. Add your logo file as `/public/logo.png` or `/public/logo.svg`
2. The site will automatically detect and use your logo
3. Fallback shows a dumbbell icon with text if no logo is found

## Whop Integration

The checkout system integrates with Whop for payment processing:
- Secure checkout process
- Automatic redirect to login after purchase
- Trust indicators and security badges
- Responsive design for all devices

## Deployment

This project is optimized for Vercel deployment:

1. Push to GitHub repository
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── admin/          # Admin dashboard and login
│   ├── checkout/       # Dynamic checkout pages
│   ├── login/          # User authentication
│   ├── pricing/        # Pricing page
│   └── page.tsx        # Landing page
├── components/         # Reusable components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   └── Logo.tsx        # Logo component
├── lib/               # Utility functions and config
└── types/             # TypeScript type definitions
```

## Customization

- **Colors**: Modify the CSS variables in `globals.css`
- **Content**: Update text in page components
- **Features**: Add new features to the features array in the homepage
- **Admin Columns**: Use the admin dashboard to add custom data fields

## License

Private - All rights reserved.