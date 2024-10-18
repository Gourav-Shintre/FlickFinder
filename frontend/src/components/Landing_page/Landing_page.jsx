
import { motion } from 'framer-motion'; // for animations
import bgImage from '../../assets/bg_img_login.png'; // replace with your background image
import { useNavigate } from 'react-router-dom';

const FlickFinderLanding = () => {
  const navigate = useNavigate(); 

  const handleGetStarted = () => {
    navigate('/home'); // Navigate to the home page
  };

  return (
    <div
      className="h-full flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center text-center text-white px-4">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Discover Your Next Favorite Flick
        </motion.h2>
        <motion.p
          className="text-md md:text-lg mb-8 max-w-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          With Flick Finder, find the perfect movie for your mood, explore popular flicks, and create your own watchlists.
        </motion.p>
        <motion.button
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={handleGetStarted}
        >
          Get Started
        </motion.button>
      </div>

      {/* Features Section */}
      <motion.div
        className="relative z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-md w-full py-16 md:py-20 px-6 md:px-10 mt-10 text-center text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        <h3 className="text-2xl md:text-4xl font-bold mb-6">Why Flick Finder?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <motion.div
            className="bg-gray-800 bg-opacity-50 p-4 md:p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h4 className="text-lg md:text-xl font-semibold mb-2">Explore Trending Movies</h4>
            <p className="text-gray-300">
              Stay up-to-date with the latest blockbusters and critically acclaimed films.
            </p>
          </motion.div>
          <motion.div
            className="bg-gray-800 bg-opacity-50 p-4 md:p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h4 className="text-lg md:text-xl font-semibold mb-2">Create Custom Watchlists</h4>
            <p className="text-gray-300">
              Organize your favorite movies into personalized watchlists.
            </p>
          </motion.div>
          <motion.div
            className="bg-gray-800 bg-opacity-50 p-4 md:p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h4 className="text-lg md:text-xl font-semibold mb-2">Find Movies Based on Mood</h4>
            <p className="text-gray-300">
              Search movies by genre, mood, or your favorite actors.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <footer className="relative z-10 w-full bg-black py-4 flex justify-center items-center text-white">
        <p className="text-sm">© 2024 Gourav Shintre. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FlickFinderLanding;
