import React, { useState } from 'react';

// Logo component - SVG based logo that resembles RajaPharma
const Logo = () => (
  <img src="./assets/logo1.png" alt="RajaPharma Logo" className="h-5 w-auto" />
);


// Main Component that handles both Landing and Login Pages
const RajaPharmaApp = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  // Navigation function
  const navigateToLogin = () => {
    setCurrentPage('login');
  };
  
  const navigateToHome = () => {
    setCurrentPage('landing');
  };
  
  // Login handler
  const handleLogin = () => {
    console.log('Login attempt with:', username, password);
    // Add actual login logic here
    alert('Login functionality would go here');
  };
  
  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-full flex flex-col md:flex-row">
        {/* Left content */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-12">
            <Logo />
          </div>
          
          <h1 className="text-5xl font-bold text-blue-800 mb-6">RAJAPHARMA</h1>
          
          <p className="text-lg text-gray-800 mb-8">
            ayo beralih ke Rajapharma dan jadikan<br />
            manajemen apotik Anda lebih gesit! 🚀
          </p>
          
          <button 
            onClick={navigateToLogin}
            className="bg-blue-700 text-white font-medium py-3 px-10 rounded-md shadow-md hover:bg-blue-800 transition w-32"
          >
            Login
          </button>
        </div>
        
        {/* Right content with decorative image */}
        <div className="w-full md:w-1/2 relative bg-gray-50 overflow-hidden">
          <div className="absolute inset-0 bg-blue-50 rounded-l-full opacity-80"></div>
          
          {/* Medical bottles illustration */}
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <img src="/api/placeholder/500/400" alt="Medical products" />
          </div>
          
          {/* Plus sign decorations */}
          <div className="absolute top-32 left-24 text-blue-200 text-6xl font-thin">+</div>
          <div className="absolute bottom-20 left-16 text-blue-200 text-6xl font-thin">+</div>
          <div className="absolute top-1/2 right-1/3 text-blue-200 text-6xl font-thin">+</div>
        </div>
      </div>
    </div>
  );
  
  // Login Page Component
  const LoginPage = () => (
    <div className="min-h-screen flex">
      {/* Left side - Decorative with gradient */}
      <div className="hidden md:block w-1/2 bg-gradient-to-b from-blue-600 to-blue-300 p-12 relative">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src="/api/placeholder/400/400" alt="Medication" className="w-80" />
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="mb-8 text-center">
            <h2 className="text-sm text-gray-600">Welcome to <span className="text-blue-600 font-medium">RajaPharma</span></h2>
            <h1 className="text-3xl font-bold mt-2">Login</h1>
          </div>
          
          <div>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="mb-8">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-blue-700 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-800 transition"
            >
              Login
            </button>
            
            <div className="mt-4 text-center">
              <button 
                onClick={navigateToHome} 
                className="text-blue-600 hover:underline text-sm"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render current page based on state
  return currentPage === 'landing' ? <LandingPage /> : <LoginPage />;
};

export default RajaPharmaApp;
//testt dulu