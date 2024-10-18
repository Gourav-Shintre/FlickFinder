import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import registerUser from '../../service/RegisterUser';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import bg_img_register from '../../assets/bg_img_login.png'; // Ensure this is the correct path
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  const [hasTyped, setHasTyped] = useState(false);

  const validatePassword = (value) => {
    setCriteria({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value)
    });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    validatePassword(value);

    if (!hasTyped && value.length > 0) {
      setHasTyped(true);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data.name, data.email, data.password);
      if (response.success) {
        toast.success('User registered successfully', {
          position: 'top-right',
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        toast.error('Registration failed! Please check your credentials.', {
          position: 'top-right',
          autoClose: 3000
        });
      }
      reset();
      setHasTyped(false);
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-full bg-black ">
      <div className="bg-white bg-opacity-70 shadow-lg rounded-lg flex flex-col md:flex-row max-w-5xl w-full overflow-hidden mt-5 mb-5">
        {/* Left Image */}
        <div
          className="w-full md:w-1/2 h-60 md:h-auto bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg_img_register})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',  // Adjust this to 'top' to show the upper part of the image
            backgroundRepeat: 'no-repeat',
          }}
        >
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <label htmlFor="name" className="block mb-2 text-gray-700 font-medium">Name</label>
            <input
              placeholder="Your Name"
              type="text"
              {...register("name", {
                required: 'This field is required',
                minLength: { value: 3, message: 'Min length is 3' },
                maxLength: { value: 100, message: 'Max length is 100' }
              })}
              className={`bg-transparent text-gray-800 placeholder-gray-500 border-b-2 border-gray-600 focus:border-gray-700 transition duration-300 w-full py-2 outline-none ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-600 mt-1">{errors.name.message}</p>}

            {/* Email Field */}
            <label htmlFor="email" className="block mt-4 mb-2 text-gray-700 font-medium">Email</label>
            <input
              placeholder="Your Email"
              type="email"
              {...register("email", {
                required: 'This field is required',
                pattern: {
                  value: /^\S+@gmail\.com$/i,
                  message: 'Invalid email format'
                }
              })}
              className={`bg-transparent text-gray-800 placeholder-gray-500 border-b-2 border-gray-600 focus:border-gray-700 transition duration-300 w-full py-2 outline-none ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-600 mt-1">{errors.email.message}</p>}

            {/* Password Field */}
            <label htmlFor="password" className="block mt-4 mb-2 text-gray-700 font-medium">Password</label>
            <input
              placeholder="Choose Your Password"
              type="password"
              {...register("password", {
                required: 'This field is required',
                minLength: { value: 8, message: 'Min length is 8' },
                maxLength: { value: 16, message: 'Max length is 16' },
                validate: (value) => {
                  validatePassword(value);
                  return true;
                }
              })}
              className={`bg-transparent text-gray-800 placeholder-gray-500 border-b-2 border-gray-600 focus:border-gray-700 transition duration-300 w-full py-2 outline-none ${errors.email ? 'border-red-500' : ''}`}
              onChange={handlePasswordChange}
            />
            {errors.password && <p className="text-red-600 mt-1">{errors.password.message}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-black text-white font-semibold py-2 px-4 rounded-lg transition-all mt-6 opacity-80 hover:opacity-100"
            >
              Submit
            </button>
          </form>

          {/* Password Requirements */}
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium">Password must contain:</p>
            <ul className="list-none space-y-2 ">
              <li className={hasTyped ? (criteria.length ? 'text-green-600' : 'text-red-600') : ''}>
                {hasTyped ? (criteria.length ? <FaCheckCircle /> : <FaTimesCircle />) : '•'} At least 8 characters
              </li>
              <li className={hasTyped ? (criteria.uppercase ? 'text-green-600' : 'text-red-600') : ''}>
                {hasTyped ? (criteria.uppercase ? <FaCheckCircle /> : <FaTimesCircle />) : '•'} At least one uppercase letter
              </li>
              <li className={hasTyped ? (criteria.lowercase ? 'text-green-600' : 'text-red-600') : ''}>
                {hasTyped ? (criteria.lowercase ? <FaCheckCircle /> : <FaTimesCircle />) : '•'} At least one lowercase letter
              </li>
              <li className={hasTyped ? (criteria.number ? 'text-green-600' : 'text-red-600') : ''}>
                {hasTyped ? (criteria.number ? <FaCheckCircle /> : <FaTimesCircle />) : '•'} At least one number
              </li>
              <li className={hasTyped ? (criteria.specialChar ? 'text-green-600' : 'text-red-600') : ''}>
                {hasTyped ? (criteria.specialChar ? <FaCheckCircle /> : <FaTimesCircle />) : '•'} At least one special character
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600 text-center">
              Already have an account? <NavLink to="/login" className="text-blue-500 hover:underline">Sign in</NavLink>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>
  );
}

export default Register;
