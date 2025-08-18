# 🌶️ CropScan AI - Chilli Infestation Dashboard

A modern, responsive frontend dashboard for chilli plant disease detection and management. Built with cutting-edge web technologies to provide an intuitive interface for agricultural disease monitoring and analysis.

![CropScan AI](https://img.shields.io/badge/CropScan%20AI-v2.0.0-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.0-purple?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.11-teal?style=flat-square&logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-5.2.0-orange?style=flat-square)

## 🏛️ About

**CropScan AI** is a research project developed by the **Department of Agriculture** at **Banaras Hindu University (BHU)** under the supervision of **Prof. Sachchida Nand Chaurasia**. This system leverages artificial intelligence and modern web technologies to revolutionize plant disease detection and management in agricultural practices.

## ✨ Features

### 🔐 User Authentication
- Secure login and signup system
- JWT-based authentication
- Form validation and error handling
- Persistent login sessions

### 📊 Interactive Dashboard
- **Plant Data Visualization**: View and analyze plant disease records
- **Real-time Statistics**: Total plants, active searches, and location tracking
- **Advanced Search & Filtering**: Search by disease name, location, or plant ID
- **Responsive Data Tables**: Mobile-friendly plant records display
- **Enhanced Modal Views**: Detailed plant information with glassmorphism effects

### 🦠 Disease Management Interface
- **Complete CRUD Operations**: Add, view, edit, and delete disease records
- **Treatment Solutions**: Manage and update disease treatment recommendations
- **Inline Editing**: Quick edit functionality for disease solutions
- **Bulk Operations**: Populate sample data and clear all records
- **Real-time Updates**: Instant UI updates after data modifications

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Modern glass effects and backdrop blur
- **Gradient Backgrounds**: Beautiful color gradients throughout the interface
- **Smooth Animations**: Polished transitions and micro-interactions
- **Loading States**: Professional loading indicators and skeleton screens
- **Error Handling**: User-friendly error messages and retry options
- **Mobile Responsive**: Fully responsive design for all screen sizes



## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd chilli_infestation_dashboard/my-projectcd
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - Use the authentication system to login or create an account

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🗂️ Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx    # Main dashboard with plant data visualization
│   ├── Login.tsx        # Authentication component with signup/signin
│   ├── DiseaseManagement.tsx # Disease CRUD operations interface
│   └── Footer.tsx       # Reusable footer component
├── store/               # Zustand state management
│   ├── useAuthStore.ts  # Authentication state management
│   ├── useDiseaseStore.ts # Disease data state management
│   └── usePlantStore.ts # Plant data state management
├── lib/                 # Utility libraries
│   └── axiosInstance.ts # HTTP client configuration
├── data/                # Static data and configurations
│   └── mockData.ts      # Demo credentials and sample data
├── services/            # API services
│   └── api.ts           # API integration layer
├── types/               # TypeScript type definitions
│   └── index.ts         # Global type definitions
├── assets/              # Static assets
└── styles/              # Global stylesheets
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_NAME=CropScan AI
VITE_VERSION=2.0.0
```

### Tailwind CSS
The project uses Tailwind CSS v4 with custom configurations for:
- Custom color palette for agricultural themes
- Responsive breakpoints
- Modern glassmorphism effects
- Smooth animations and transitions
- Component-specific styling



## 🧪 Testing

### Authentication System
- Test the login/signup functionality
- JWT token persistence validation
- Form validation and error handling

### Demo Features
The application includes comprehensive demo features:
- Sample plant disease records
- Disease management interface
- Interactive dashboard components
- Responsive design testing

## 🛠️ Development

### Tech Stack
- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.0 for fast development and building
- **Styling**: Tailwind CSS 4.1.11 with glassmorphism effects
- **State Management**: Zustand for efficient state management
- **HTTP Client**: Axios for API communication
- **Icons**: Lucide React for modern iconography
- **Date Handling**: date-fns for date formatting and manipulation
- **Form Handling**: Built-in React hooks with validation

### Code Quality
- **ESLint**: Configured with React and TypeScript rules
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (recommended)

### Development Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## 📱 Browser Support & Performance

### Supported Browsers
- **Chrome** (recommended) - v90+
- **Firefox** - v88+
- **Safari** - v14+
- **Edge** - v90+

### Performance Features
- **Fast Refresh**: Instant updates during development
- **Code Splitting**: Optimized bundle sizes
- **Lazy Loading**: Efficient component loading
- **Image Optimization**: Responsive image handling
- **Caching Strategy**: Optimized state persistence


## 📄 License

This project is developed for academic and research purposes at Banaras Hindu University. All rights reserved.

## 📞 Contact & Support

### Project Team
- **Supervisor**: Prof. Sachchida Nand Chaurasia
- **Department**: Computer Science & Agriculture
- **Institution**: Banaras Hindu University

### Technical Support
- **Frontend Issues**: UI/UX related queries and bug reports
- **Feature Requests**: New functionality suggestions
- **Documentation**: Usage and integration guides

### University Information
- **Location**: Varanasi, Uttar Pradesh, India
- **Established**: 1916
- **Website**: [bhu.ac.in](https://www.bhu.ac.in)

---

<div align="center">

**© 2025 CropScan AI — A project by BHU Agriculture Department**

*Advancing agricultural technology through innovative research and development*

</div>
