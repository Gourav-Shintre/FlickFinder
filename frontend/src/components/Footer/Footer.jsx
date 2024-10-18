
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white w-full py-4 relative bottom-0 ">
        

        
            <div className="container mx-auto text-center mb-4">
                <h3 className="text-sm font-semibold mb-2">Get in Touch</h3>
                <div className="flex justify-center space-x-4">
                    <NavLink to="https://twitter.com"  rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaTwitter className="h-5 w-5" />
                    </NavLink>
                    <NavLink to="https://www.instagram.com/gourav_shintre_/"  rel="noopener noreferrer" className="hover:text-pink-400">
                        <FaInstagram className="h-5 w-5" />
                    </NavLink>
                    <NavLink to="https://www.linkedin.com/in/gourav-shintre-b52545252/"  rel="noopener noreferrer" className="hover:text-blue-600">
                        <FaLinkedin className="h-5 w-5" />
                    </NavLink>
                    <NavLink to="https://github.com/Gourav-Shintre"  rel="noopener noreferrer" className="hover:text-slate-700">
                        <FaGithub className="h-5 w-5" />
                    </NavLink>
                </div>
            </div>

          
            <hr className="border-gray-600 mb-4" />

        
            <div className="container mx-auto text-center">
                <p className="text-xs">&copy; 2024 Gourav Shintre. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;NavLink