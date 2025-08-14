# Mohammed Bin Abdulaziz Al-Ajlan Law Firm Website

A modern, multilingual law firm website built with Next.js, featuring a responsive design, dark brown theme, and comprehensive legal services showcase.

## 🌟 Features Implemented

### 1. Header Navigation ✅
- **Responsive Navbar**: Logo, navigation links, and Services dropdown
- **Services Dropdown**: Brown background with 4 service categories
- **Search Functionality**: Icon to open search input, redirects to search page
- **Multilingual Support**: AR/EN toggle with RTL for Arabic
- **Mobile Menu**: Responsive hamburger menu for mobile devices

### 2. Hero Section ✅
- **Riyadh City Night Background**: Actual Riyadh cityscape with Kingdom Centre
- **Auto-playing Slider**: 4 slides with smooth transitions
- **Multilingual Content**: All text in Arabic and English
- **Professional Portrait**: Featured lawyer image
- **Call-to-Action**: Read More button with language support

### 3. Our Team Section ✅
- **Team Members Carousel**: 4 team members with detailed profiles
- **Professional Images**: Portrait photos for each team member
- **Multilingual Support**: Names, roles, and descriptions in AR/EN
- **Team Statistics**: Experience, cases, clients, and experts count
- **Contact Buttons**: View Profile and Contact Me options

### 4. Clients Testimonials ✅
- **Client Testimonials**: 3 detailed client reviews with ratings
- **Star Ratings**: 5-star rating system
- **Client Information**: Names, companies, and roles
- **Client Logos Section**: Placeholder for client company logos
- **Call-to-Action**: Free consultation booking

### 5. Footer ✅
- **Comprehensive Links**: Services, Company, and Resources sections
- **Newsletter Subscription**: Formik form with Yup validation
- **Contact Information**: Address, phone, email, and business hours
- **Social Media Links**: Facebook, Twitter, LinkedIn, Instagram
- **Multilingual Support**: All content in Arabic and English

### 6. Technical Requirements ✅
- **Frontend**: Next.js 13.5.6 with TypeScript
- **Styling**: Tailwind CSS with custom brown color palette
- **State Management**: Redux Toolkit with 3 slices
- **Form Handling**: Formik with Yup validation
- **Icons**: Lucide React icons
- **Responsive Design**: Mobile-first approach

## 🎨 Design System

### Color Palette
- **Primary Brown**: `#4A2C20` - Main brand color
- **Secondary Brown**: `#8B4513` - Accent color
- **Light Brown**: `#D2691E` - Hover states
- **Accent Blue**: `#4682B4` - Secondary accent
- **Text Colors**: White, Black, Gray variations

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Monospace**: Courier New
- **RTL Support**: Arabic text with proper directionality

## 🚀 Getting Started

### Prerequisites
- Node.js 18.14.0 or higher
- npm 9.3.1 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3001
   ```

## 📁 Project Structure

```
web-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Redux provider
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles and CSS variables
│   ├── components/
│   │   ├── Header.tsx          # Navigation with search and language toggle
│   │   ├── HeroSection.tsx     # Hero slider with Riyadh background
│   │   ├── OurTeam.tsx         # Team members carousel
│   │   ├── ClientsTestimonials.tsx # Client testimonials and logos
│   │   ├── Footer.tsx          # Footer with newsletter subscription
│   │   └── providers/
│   │       └── ReduxProvider.tsx # Redux store provider
│   └── lib/
│       ├── store.ts            # Redux store configuration
│       ├── hooks.ts            # Typed Redux hooks
│       └── slices/
│           ├── searchSlice.ts  # Search state management
│           ├── languageSlice.ts # Language and RTL state
│           └── formSlice.ts    # Form submission state
├── public/
│   └── images/
│       ├── riyadh-night.jpg    # Riyadh city night background
│       └── portrait.jpg        # Professional portrait image
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies and scripts
```

## 🔧 Configuration

### Redux Store
The application uses Redux Toolkit for state management with three main slices:

1. **Search Slice**: Manages search functionality
2. **Language Slice**: Handles AR/EN language switching and RTL
3. **Form Slice**: Manages newsletter subscription form state

### Tailwind CSS
Custom configuration with:
- Brown color palette
- Custom font families
- Responsive breakpoints
- RTL support utilities

### Multilingual Support
- **Languages**: Arabic (RTL) and English (LTR)
- **Implementation**: Redux state management
- **RTL Support**: Automatic text direction switching
- **Content**: All text content available in both languages

## 📱 Responsive Design

The website is fully responsive with:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile Features
- Hamburger menu navigation
- Touch-friendly carousel controls
- Optimized form inputs
- Responsive typography

## 🔍 Search Functionality

- **Search Icon**: Click to open search input
- **Search Input**: Real-time query input
- **Search Results**: Redirects to search page with categorized results
- **Categories**: Team members and Services

## 📧 Newsletter Subscription

- **Form Validation**: Email validation with Yup
- **Error Handling**: Duplicate email prevention
- **Success Messages**: User feedback for successful subscriptions
- **Multilingual**: Form labels and messages in AR/EN

## 🎯 Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic component-based code splitting
- **Lazy Loading**: Images and components loaded on demand
- **CSS Optimization**: Tailwind CSS purging for production

## 🔮 Future Enhancements

### CMS Integration (Strapi)
- Content management for pages, services, team members
- Blog and news management
- Client testimonials and case studies
- Newsletter subscriber management

### Additional Features
- **Blog System**: Legal articles and insights
- **Case Studies**: Detailed legal case presentations
- **Online Consultation**: Booking system for legal consultations
- **Document Upload**: Client document submission portal
- **Live Chat**: Real-time client support

### SEO Optimization
- **Meta Tags**: Dynamic meta tags for each page
- **Structured Data**: Schema markup for law firm
- **Sitemap**: Automatic sitemap generation
- **Analytics**: Google Analytics integration

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (if configured)
- **Component Structure**: Modular, reusable components

## 📄 License

This project is proprietary software for Mohammed Bin Abdulaziz Al-Ajlan Law Firm.

## 🤝 Support

For technical support or questions about the implementation, please contact the development team.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
