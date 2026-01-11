
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Lock, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  adminPassword: string;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ adminPassword }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/admin";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      sessionStorage.setItem('hitech_auth', 'true');
      navigate(from, { replace: true });
    } else {
      setError('Incorrect password. Please try again.');
      setPasswordInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F9F1] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-primary/10 p-10 md:p-14 border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex bg-primary/10 p-4 rounded-3xl text-primary mb-6">
            <Box size={40} />
          </div>
          <h1 className="text-3xl font-black text-black tracking-tight mb-2">Back Office</h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Hi-Tech Management Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative group">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Access Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type={showPassword ? 'text' : 'password'}
                className="w-full pl-12 pr-12 py-5 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none font-bold text-gray-800 transition-all placeholder:text-gray-300"
                placeholder="••••••••••••"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setError('');
                }}
                autoFocus
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <p className="text-red-500 text-[10px] font-black uppercase mt-3 ml-1 tracking-wider">{error}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            Authenticate <Lock size={20} />
          </button>
        </form>

        <div className="mt-12 text-center">
           <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-loose">
             Proprietary Management System<br />
             © {new Date().getFullYear()} HI-TECH UPVC HARDWARES
           </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
