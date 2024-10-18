import { createBrowserRouter, Navigate, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Error_page from './components/Error/Error_Page';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import MovieDetail from './components/Home/MovieDetail';
import DetailedView from './components/Home/DetailedView';
import Contact from './components/Contact/Contact';
import FlickFinderLanding from './components/Landing_page/Landing_page';
import FavouriteMovies from './components/FavouriteMovies/FavouriteMovies';

const Layout = () => {
  const location = useLocation(); 
  
  const isLandingPage = location.pathname === '/landing_page';
  const isLoginPage = location.pathname === '/login';
  const isRegistered=location.pathname==='/register';


  return (
    <div className="flex flex-col min-h-screen">
      {!isLandingPage && !isLoginPage && !isRegistered && <Header />} 
      <main className="flex-grow mt-16">
        <Outlet />
      </main>
      {!isLandingPage  && !isLoginPage && !isRegistered && <Footer />} 
    </div>
  );
};

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  // Define the routes
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error_page />,
      children: [
        {
          path: '/',
          element: <Navigate to={isAuthenticated() ? '/home' : '/login'} />, 
        },
        {
          path: '/home',
          element: <ProtectedRoute element={<Home />} />, 
        },
        {
          path: '/login',
          element: <Login />, 
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/movie/:id',
          element: <MovieDetail />,
        },
        {
          path: '/detailedView/:id',
          element: <DetailedView />,
        },
        {
          path: '/contact',
          element: <Contact />,
        },
        {
          path: '/landing_page',
          element: <FlickFinderLanding />,
        },
        {
          path:'/favourites',
          element:<FavouriteMovies/>
        }
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
