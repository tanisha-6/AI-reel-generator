import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Username Validation
    if (!formData.username.trim()) {
    newErrors.username = 'Username is required';
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    // Successful Validation
    if (Object.keys(newErrors).length === 0) {
      try {
        const data = await loginUser({
            username: formData.username,
            password: formData.password,
        });

        localStorage.setItem(
            'access',
            data.access
        );

        localStorage.setItem(
            'refresh',
            data.refresh
        );
 
      console.log('Login successful');
      navigate('/dashboard', { replace: true });

        } catch (error) {

        console.log(error);

        alert('Invalid credentials');
        }
    }
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 relative overflow-hidden">

        {/* Decorative Glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 blur-[80px]"></div>

        <div className="relative z-10 text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-400">
            Re-initialize your creative session
          </p>
        </div>

        <form
          className="space-y-6 relative z-10"
          onSubmit={handleSubmit}
        >

          {/* Email Field */}
          <div className="space-y-2">

            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="creator@aigenix.ai"
              className={`w-full bg-white/5 border rounded-lg px-4 py-3 outline-none transition placeholder:text-gray-700 focus:ring-1 ${
                errors.username
                  ? 'border-red-500 focus:ring-red-500/30'
                  : 'border-white/10 focus:border-cyan-500 focus:ring-cyan-500/30'
              }`}
            />

            {errors.username && (
              <p className="text-red-400 text-xs">
                {errors.username}
              </p>
            )}

          </div>

          {/* Password Field */}
            <div className="space-y-2">

            <div className="flex justify-between items-center">

                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Password
                </label>

                {/* <button
                type="button"
                className="text-[10px] text-cyan-400 uppercase font-bold hover:text-cyan-300 transition"
                >
                Forgot?
                </button> */}

            </div>

            <div className="relative">

                <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full bg-white/5 border rounded-lg px-4 py-3 pr-12 outline-none transition placeholder:text-gray-700 focus:ring-1 ${
                    errors.password
                    ? 'border-red-500 focus:ring-red-500/30'
                    : 'border-white/10 focus:border-cyan-500 focus:ring-cyan-500/30'
                }`}
                />

                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
                >
                {showPassword ? (
                    <FiEyeOff size={18} />
                ) : (
                    <FiEye size={18} />
                )}
                </button>

            </div>

            {errors.password && (
                <p className="text-red-400 text-xs">
                {errors.password}
                </p>
            )}

            </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg font-bold uppercase tracking-widest hover:opacity-90 transition shadow-lg shadow-purple-500/20 active:scale-[0.98]"
          >
            Authorize Session
          </button>

          {/* Signup Redirect */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Not yet registered?{' '}

            <Link
              to="/signup"
              className="text-purple-400 hover:underline"
            >
              Create Account
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;