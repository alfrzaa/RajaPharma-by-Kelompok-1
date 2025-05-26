import React, { useState } from 'react';
import obat from '../assets/obat.png';

// Login Page Component
const LoginPage = ({ onNavigateToHome }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  // Login handler
  const handleLogin = () => {
    console.log('Login attempt with:', selectedRole, password);
    // Add actual login logic here
    alert(`Login functionality would go here for role: ${selectedRole}`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Decorative with gradient */}
      <div className="hidden md:block w-1/2 bg-gradient-to-b from-blue-600 to-blue-300 p-12 relative">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={obat} alt="Obat" className="w-80" />
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
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Select your role
              </label>
              <select
                id="role"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="" disabled>Choose role</option>
                <option value="admin">Admin</option>
                <option value="kasir">Kasir</option>
              </select>
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
                onClick={onNavigateToHome} 
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
};

export default LoginPage;