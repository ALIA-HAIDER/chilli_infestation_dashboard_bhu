import React from 'react';
import { BarChart3, MapPin, Calendar, Edit } from 'lucide-react';

interface FooterProps {
  variant?: 'dashboard' | 'disease-management' | 'default';
}

export const Footer: React.FC<FooterProps> = ({ variant = 'default' }) => {
  const getVariantConfig = () => {
    switch (variant) {
      case 'dashboard':
        return {
          icon: BarChart3,
          title: 'CropScan AI',
          subtitle: 'Smart Agriculture',
          description: 'Advanced AI-powered plant disease detection and management system for sustainable agriculture.',
          accentColor: 'green'
        };
      case 'disease-management':
        return {
          icon: Edit,
          title: 'Disease Management',
          subtitle: 'CropScan AI Module',
          description: 'Comprehensive disease database management for accurate AI-powered plant diagnosis and treatment recommendations.',
          accentColor: 'blue'
        };
      default:
        return {
          icon: BarChart3,
          title: 'CropScan AI',
          subtitle: 'Smart Agriculture',
          description: 'Advanced AI-powered plant disease detection and management system for sustainable agriculture.',
          accentColor: 'green'
        };
    }
  };

  const config = getVariantConfig();
  const IconComponent = config.icon;

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-t border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className={`h-10 w-10 bg-gradient-to-r ${
                  config.accentColor === 'green' 
                    ? 'from-green-500 to-emerald-500' 
                    : 'from-blue-500 to-purple-500'
                } rounded-xl flex items-center justify-center mr-3`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{config.title}</h3>
                  <p className={`${
                    config.accentColor === 'green' ? 'text-green-400' : 'text-blue-400'
                  } text-sm`}>
                    {config.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {config.description}
              </p>
              <div className="flex space-x-3">
                <a href="#" className={`text-gray-400 hover:${
                  config.accentColor === 'green' ? 'text-green-400' : 'text-blue-400'
                } transition-colors`}>
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className={`text-gray-400 hover:${
                  config.accentColor === 'green' ? 'text-green-400' : 'text-blue-400'
                } transition-colors`}>
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className={`text-gray-400 hover:${
                  config.accentColor === 'green' ? 'text-green-400' : 'text-blue-400'
                } transition-colors`}>
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* University Information */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                config.accentColor === 'green' ? 'text-green-400' : 'text-blue-400'
              }`}>
                Banaras Hindu University
              </h3>
              <div className="space-y-2">
                <p className="text-gray-300 font-medium">Department of Agriculture</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Advancing agricultural technology through innovative research and development.
                </p>
                <div className="mt-4">
                  <p className="text-gray-400 text-sm">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Varanasi, Uttar Pradesh, India
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Established: 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Project Team */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                config.accentColor === 'green' ? 'text-green-400' : 'text-blue-400'
              }`}>
                Project Team
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-300 font-medium">Prof. Sachchida Nand Chaurasia</p>
                  <p className="text-gray-400 text-sm">Project Supervisor</p>
                  <p className="text-gray-400 text-sm">Department of Computer Science</p>
                </div>
                <div className="mt-4">
                  <p className="text-gray-400 text-sm font-medium mb-2">Research Areas:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                      config.accentColor === 'green' 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-blue-900 text-blue-300'
                    }`}>
                      AI/ML
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-purple-900 text-purple-300">
                      Agriculture
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-orange-900 text-orange-300">
                      IoT
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                config.accentColor === 'green' ? 'text-green-400' : 'text-blue-400'
              }`}>
                Contact & Support
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Technical Support</p>
                  <a href="mailto:help@cropscan.ai" className={`text-gray-300 hover:${
                    config.accentColor === 'green' ? 'text-green-400' : 'text-blue-400'
                  } transition-colors text-sm`}>
                    help@cropscan.ai
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Research Inquiries</p>
                  <a href="mailto:research@cropscan.ai" className={`text-gray-300 hover:${
                    config.accentColor === 'green' ? 'text-green-400' : 'text-blue-400'
                  } transition-colors text-sm`}>
                    research@cropscan.ai
                  </a>
                </div>
                <div className="mt-4">
                  <p className="text-gray-400 text-sm mb-2">System Status</p>
                  <div className="flex items-center">
                    <div className={`h-2 w-2 ${
                      config.accentColor === 'green' ? 'bg-green-400' : 'bg-blue-400'
                    } rounded-full mr-2 animate-pulse`}></div>
                    <span className={`${
                      config.accentColor === 'green' ? 'text-green-400' : 'text-blue-400'
                    } text-sm`}>
                      All systems operational
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2025 CropScan AI — A project by BHU Agriculture Department. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className={`text-gray-400 hover:${
                config.accentColor === 'green' ? 'text-green-400' : 'text-blue-400'
              } text-sm transition-colors`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-gray-400 hover:${
                config.accentColor === 'green' ? 'text-green-400' : 'text-blue-400'
              } text-sm transition-colors`}>
                Terms of Service
              </a>
              <a href="#" className={`text-gray-400 hover:${
                config.accentColor === 'green' ? 'text-green-400' : 'text-blue-400'
              } text-sm transition-colors`}>
                Documentation
              </a>
              <div className="flex items-center text-gray-400 text-sm">
                <span className="mr-2">Version 1.0.0</span>
                <span className={`px-2 py-1 ${
                  variant === 'disease-management'
                    ? 'bg-blue-900 text-blue-300'
                    : 'bg-green-900 text-green-300'
                } rounded text-xs`}>
                  {variant === 'disease-management' ? 'Admin Panel' : 'Beta'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
