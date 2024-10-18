import { useNavigate } from 'react-router-dom';

function LogoutButton({ className }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        navigate('/login'); 
    };

    return (
        <button onClick={handleLogout} className={`logout-button ${className}`}>
            Logout
        </button>
    );
}

export default LogoutButton;
