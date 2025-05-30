import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Plus } from 'lucide-react';
import logo from '../assets/logo1.png';
import medicine from '../assets/medicine1.png';

// Logo component (using your original logo)
const Logo = () => (
  <img src={logo} alt="RajaPharma Logo" className="h-16 w-auto" />
);

// Floating animation component
const FloatingElement = ({ children, delay = 0, duration = 4 }) => {
  return (
    <div 
      className="animate-float"
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

// Decorative plus component
const DecorativePlus = ({ className, delay = 0 }) => (
  <div 
    className={`absolute text-blue-200/40 text-5xl font-light transition-all duration-1000 ${className}`}
    style={{
      animation: `fadeInRotate 1.5s ease-out ${delay}s both`
    }}
  >
    <Plus className="w-12 h-12" />
  </div>
);

// Particle effect
const Particle = ({ index }) => (
  <div
    className="absolute w-1 h-1 bg-blue-300/60 rounded-full"
    style={{
      left: `${20 + Math.random() * 60}%`,
      top: `${20 + Math.random() * 60}%`,
      animation: `particle ${4 + Math.random() * 3}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 3}s`
    }}
  />
);

// Main Landing Page Component
const LandingPage = ({ onNavigateToLogin }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };

    const container = document.getElementById('landing-container');
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(-8px) rotate(-1deg); }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes fadeInRotate {
          from {
            opacity: 0;
            transform: rotate(-180deg) scale(0.5);
          }
          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }
        
        @keyframes particle {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-25px) scale(1.2);
            opacity: 0.8;
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f0f9ff 50%, #dbeafe 75%, #f0f9ff 100%);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <div 
        id="landing-container"
        className="min-h-screen relative overflow-hidden gradient-bg"
      >
        {/* Interactive mouse light effect */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.15), transparent 50%)`
          }}
        />

        {/* Subtle particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <Particle key={i} index={i} />
          ))}
        </div>

        <div className="relative z-10 min-h-screen flex items-center px-6 lg:px-16">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Content */}
              <div className="space-y-8 lg:pr-8">
                
                {/* Logo */}
                <div 
                  className={`transform transition-all duration-1000 ${
                    isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xl">R</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Heading */}
                <div 
                  className="space-y-4"
                  style={{ animation: 'slideInLeft 1s ease-out 0.2s both' }}
                >
                  <h1 className="text-6xl lg:text-7xl font-black text-[#1A6291] leading-tight relative">
                    RAJAPHARMA
                    <div className="absolute inset-0 shimmer-effect rounded-lg"></div>
                  </h1>
                  
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Sparkles className="w-6 h-6 text-cyan-500" />
                    <span className="text-lg font-semibold">Solusi Digital Terdepan</span>
                  </div>
                </div>

                {/* Description */}
                <div 
                  className="space-y-6"
                  style={{ animation: 'slideInLeft 1s ease-out 0.4s both' }}
                >
                  <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
                    Ayo beralih ke Rajapharma dan jadikan<br />
                    manajemen apotik Anda <span className="text-[#1A6291] font-bold">lebih gesit!</span> 🚀
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center p-3 glass-card rounded-xl shadow-sm">
                      <div className="text-2xl font-bold text-[#1A6291]">99%</div>
                      <div className="text-sm text-gray-600">Akurasi</div>
                    </div>
                    <div className="text-center p-3 glass-card rounded-xl shadow-sm">
                      <div className="text-2xl font-bold text-[#1A6291]">24/7</div>
                      <div className="text-sm text-gray-600">Support</div>
                    </div>
                    <div className="text-center p-3 glass-card rounded-xl shadow-sm">
                      <div className="text-2xl font-bold text-[#1A6291]">5★</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div 
                  className="pt-4"
                  style={{ animation: 'slideInLeft 1s ease-out 0.6s both' }}
                >
                  <button 
                    onClick={onNavigateToLogin}
                    className="group relative overflow-hidden bg-[#1A6291] hover:bg-[#134b73] text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center space-x-3">
                      <span className="text-lg">Login Sekarang</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>
                  
                  <p className="text-gray-600 text-sm mt-3 ml-1">
                    ✨ Coba gratis tanpa komitmen
                  </p>
                </div>
              </div>

              {/* Right Content - Medicine Image */}
              <div className="relative lg:pl-8">
                <div 
                  className="relative h-96 lg:h-[500px]"
                  style={{ animation: 'slideInRight 1.2s ease-out 0.3s both' }}
                >
                  
                  {/* Background decorative circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/80 to-cyan-100/80 rounded-full blur-3xl"></div>
                  
                  {/* Main medicine image container */}
                  <FloatingElement delay={0.5}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="relative p-8 glass-card rounded-3xl shadow-2xl">
                        <img 
                          src="../assets/medicine1.png" 
                          alt="Medical products" 
                          className="w-80 h-auto object-contain"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-3xl"></div>
                      </div>
                    </div>
                  </FloatingElement>

                  {/* Decorative plus signs */}
                  <DecorativePlus 
                    className="top-16 right-12" 
                    delay={1}
                  />
                  <DecorativePlus 
                    className="bottom-20 left-8" 
                    delay={1.3}
                  />
                  <DecorativePlus 
                    className="top-32 left-16" 
                    delay={1.6}
                  />
                  <DecorativePlus 
                    className="bottom-32 right-20" 
                    delay={1.9}
                  />

                  {/* Floating feature badges */}
                  <FloatingElement delay={1.2}>
                    <div className="absolute top-8 left-8 glass-card rounded-xl p-3 shadow-lg">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-[#1A6291]">Smart</div>
                        <div className="text-xs text-gray-600">Inventory</div>
                      </div>
                    </div>
                  </FloatingElement>

                  <FloatingElement delay={1.8}>
                    <div className="absolute bottom-12 right-8 glass-card rounded-xl p-3 shadow-lg">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-[#1A6291]">Real-time</div>
                        <div className="text-xs text-gray-600">Analytics</div>
                      </div>
                    </div>
                  </FloatingElement>

                  <FloatingElement delay={2.4}>
                    <div className="absolute top-1/2 right-2 glass-card rounded-xl p-3 shadow-lg">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-[#1A6291]">Secure</div>
                        <div className="text-xs text-gray-600">Cloud</div>
                      </div>
                    </div>
                  </FloatingElement>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom subtle gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
      </div>
    </>
  );
};

export default LandingPage;