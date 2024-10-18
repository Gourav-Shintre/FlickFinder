import React, { useState, useRef, useEffect } from 'react';
import logo from '../../assets/logo.jpg';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import LogoutButton from '../Logout/Logout';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const searchBarRef = useRef(null);
    const menuRef = useRef(null); // Ref for mobile menu

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState); // Toggle menu state
    };

    const handleInputClick = () => {
        setIsDropdownOpen(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchBarRef.current && !searchBarRef.current.contains(event.target) &&
                menuRef.current && !menuRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
                setIsMenuOpen(false); // Close the mobile menu when clicking outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchBarRef, menuRef]);

    return (
        <header className="bg-gray-800 p-4 w-full flex items-center justify-between relative top-0 left-0 z-50">
            <div className="flex items-center">
                <img src={logo} alt="Flick Finder" className="h-10 mr-2" />
                <h1 className="text-white text-xl font-bold">Flick Finder</h1>
            </div>

            {/* Centered Navigation Links */}
            <div className='flex justify-center flex-grow md:space-x-4'>
                <nav className={`hidden md:flex`}>
                    <NavLink to="/" className="text-gray-300 hover:text-white ml-5">Home</NavLink>
                    <NavLink to="/favourites" className="text-gray-300 hover:text-white ml-5">Favourites</NavLink>
                    <NavLink to="/contact" className="text-gray-300 hover:text-white ml-5">Contact</NavLink>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="relative md:block mx-4" ref={searchBarRef}>
                <SearchBar onClick={handleInputClick} />
                {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-full h-80 bg-white text-black shadow-lg rounded-md z-10 p-4">
                        {/* Placeholder for dynamic search results */}
                    </div>
                )}
            </div>

            {/* Logout Button placed after SearchBar */}
            <LogoutButton className="text-gray-300 hover:text-white mr-3" />

            {/* Mobile Menu */}
            <div 
                ref={menuRef}
                className={`absolute top-16 right-0  bg-gray-800 p-4 rounded-lg shadow-lg md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
            >
                <NavLink to="/home" className="text-gray-300 hover:text-white block" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                <NavLink to="/favourites" className="text-gray-300 hover:text-white block" onClick={() => setIsMenuOpen(false)}>Favourites</NavLink>
                <NavLink to="/contact" className="text-gray-300 hover:text-white block" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
            </div>
        </header>
    );
};

export default Header;
