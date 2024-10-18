
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { loginUser } from '../../service/LoginUser';
import 'react-toastify/dist/ReactToastify.css';
import bg_img_login from '../../assets/bg_img_login.png';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data.email, data.password);

      if (response.success) {
        toast.success('Logged in successfully!', {
          position: 'top-right',
          autoClose: 3000
        });
        setTimeout(() => {
          navigate('/landing_page');
        }, 3000);
      } else {
        toast.error('Login failed! Please check your credentials.', {
          position: 'top-right',
          autoClose: 3000
        });
      }

      reset();
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-full bg-black p-4">
      <div className="bg-white bg-opacity-70 shadow-lg rounded-lg flex flex-col md:flex-row max-w-lg md:max-w-5xl w-full md:h-[600px] h-auto overflow-hidden">
        {/* Left Image */}
        <div
          className="w-full md:w-1/2 h-60 md:h-auto bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg_img_login})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',  // Adjust this to 'top' to show the upper part of the image
            backgroundRepeat: 'no-repeat',
          }}
        >
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-4 md:p-20">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              className={`bg-transparent text-gray-800 placeholder-gray-500 border-b-2 border-gray-600 focus:border-gray-700 transition duration-300 w-full py-2 outline-none ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Your Email"
              {...register("email", { required: 'This field is required' })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}

            {/* Password Field */}
            <label htmlFor="password" className="block mt-4 mb-2 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              id="password"
              className={`bg-transparent text-gray-800 placeholder-gray-500 border-b-2 border-gray-600 focus:border-gray-700 transition duration-300 w-full py-2 outline-none ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Your Password"
              {...register("password", {
                required: "This field is required",
                maxLength: { value: 16, message: "Max length is 16 characters" },
                minLength: { value: 8, message: 'Min length is 8 characters' }
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 px-4 rounded-lg transition-all mt-6 opacity-80 hover:opacity-100"
            >
              Submit
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Don't have an account? <NavLink to="/register" className="text-blue-500 hover:underline">Sign up</NavLink>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
