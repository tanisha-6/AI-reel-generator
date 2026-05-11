import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: location.state?.username || '',
    email: location.state?.email || '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Username Validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm Password Validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    // Successful Validation
    if (Object.keys(newErrors).length === 0) {
      try {
        await registerUser({
            username: formData.username,
            email: formData.email,
            password: formData.password,
        });

        alert('Account created successfully!');
        navigate('/login');

        } catch (error) {
            console.log(error);

            if (error.response?.data?.username) {
                alert(error.response.data.username[0]);

            } else if (error.response?.data?.email) {
                alert(error.response.data.email[0]);

            } else {
                alert('Something went wrong');
            }
            }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (
        name === 'password' ||
        name === 'confirmPassword'
        ) {
        setErrors((prev) => ({
            ...prev,
            confirmPassword: '',
        }));
    }

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center p-6">

      <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 relative overflow-hidden">

        {/* Decorative Glow */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/10 blur-[120px]"></div>

        <div className="relative z-10 text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">
            Create Your Identity
          </h2>

          <p className="text-gray-400 text-sm">
            Join the next generation of AI content orchestration.
          </p>
        </div>

        <form
          className="space-y-5 relative z-10"
          onSubmit={handleSubmit}
        >

          {/* Username */}
          <div className="space-y-2">

            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Creator Handle
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="@yourname"
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 outline-none transition placeholder:text-gray-700 focus:ring-1 ${
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

          {/* Email */}
          <div className="space-y-2">

            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="creator@aigenix.ai"
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 outline-none transition placeholder:text-gray-700 focus:ring-1 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500/30'
                  : 'border-white/10 focus:border-cyan-500 focus:ring-cyan-500/30'
              }`}
            />

            {errors.email && (
              <p className="text-red-400 text-xs">
                {errors.email}
              </p>
            )}

          </div>

          {/* Password */}
          <div className="space-y-2">

            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 pr-12 outline-none transition placeholder:text-gray-700 focus:ring-1 ${
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

          {/* Confirm Password */}
          <div className="space-y-2">

            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 pr-12 outline-none transition placeholder:text-gray-700 focus:ring-1 ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500/30'
                    : 'border-white/10 focus:border-cyan-500 focus:ring-cyan-500/30'
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>

            </div>

            {errors.confirmPassword && (
              <p className="text-red-400 text-xs">
                {errors.confirmPassword}
              </p>
            )}

          </div>

          {/* Submit Button */}
          <div className="pt-4">

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold uppercase tracking-[0.2em] hover:opacity-90 transition shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
            >
              Initialize Account
            </button>

          </div>

          {/* Terms */}
          <p className="text-center text-gray-500 text-xs mt-6">
            By initializing, you agree to our{' '}
            <span className="text-gray-300 underline cursor-pointer">
              System Protocols
            </span>
          </p>

          {/* Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>

          {/* Redirect */}
          <p className="text-center text-gray-400 text-sm">
            Already registered?{' '}

            <Link
              to="/login"
              className="text-cyan-400 font-bold hover:text-cyan-300 transition"
            >
              Login Here
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Signup;