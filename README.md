# 🌶️ CropScan AI - Chilli Infestation Dashboard

A professional AI-powered dashboard for chilli plant disease detection, management, and monitoring. This system provides comprehensive tools for agricultural researchers and farmers to identify, track, and manage plant diseases effectively.

![CropScan AI](https://img.shields.io/badge/CropScan%20AI-v1.0.0-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.0-purple?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.11-teal?style=flat-square&logo=tailwindcss)

## 🏛️ About

**CropScan AI** is a research project developed by the **Department of Agriculture** at **Banaras Hindu University (BHU)** under the supervision of **Prof. Sachchida Nand Chaurasia**. This system leverages artificial intelligence and modern web technologies to revolutionize plant disease detection and management in agricultural practices.

## ✨ Features

### 🔐 Admin Authentication
- Secure login system for authorized personnel
- Role-based access control
- Demo credentials for testing and evaluation

### 📊 Dashboard Analytics
- **Plant Request Management**: View and track disease identification requests
- **Multi-Image Support**: Handle multiple images per plant request
- **Real-time Status Tracking**: Monitor request processing status
- **Location-based Filtering**: Track geographical distribution of diseases
- **Advanced Search**: Search by disease type, location, or request ID

### 🦠 Disease Management System
- **CRUD Operations**: Create, Read, Update, Delete disease information
- **Solution Database**: Maintain comprehensive treatment solutions
- **Expert Recommendations**: Store and manage expert advice
- **Version Control**: Track updates and modifications
- **Search & Filter**: Quick access to disease information



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
   - Use demo credentials:
     - **Username**: `admin`
     - **Password**: `admin123`

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
│   ├── Dashboard.tsx    # Main dashboard with plant requests
│   ├── Login.tsx        # Authentication component
│   ├── DiseaseManagement.tsx # Disease CRUD operations
│   └── Footer.tsx       # Reusable footer component
├── data/                # Mock data and configurations
│   └── mockData.ts      # Sample data for development
├── services/            # API services and utilities
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
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=CropScan AI
VITE_VERSION=1.0.0
```

### Tailwind CSS
The project uses Tailwind CSS v4 with custom configurations for:
- Custom color palette for agricultural themes
- Responsive breakpoints
- Custom animations and transitions
- Component-specific styling



## 🧪 Testing

### Demo Credentials
- **Username**: `admin`
- **Password**: `admin123`

### Mock Data
The application includes comprehensive mock data for:
- Plant disease requests with multiple images
- Disease database with solutions
- User authentication data

## 🛠️ Development

### Tech Stack
- **Frontend**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.0
- **Styling**: Tailwind CSS 4.1.11
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Routing**: React Router DOM 7.8.0

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

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge


## 📄 License

This project is developed for academic and research purposes at Banaras Hindu University. All rights reserved.

## 📞 Contact & Support

### Project Team
- **Supervisor**: Prof. Sachchida Nand Chaurasia
- **Department**: Computer Science & Agriculture
- **Institution**: Banaras Hindu University

### Technical Support
- **Email**: help@cropscan.ai
- **Research Inquiries**: research@cropscan.ai

### University Information
- **Location**: Varanasi, Uttar Pradesh, India
- **Established**: 1916
- **Website**: [bhu.ac.in](https://www.bhu.ac.in)

---

<div align="center">

**© 2025 CropScan AI — A project by BHU Agriculture Department**

*Advancing agricultural technology through innovative research and development*

</div>
