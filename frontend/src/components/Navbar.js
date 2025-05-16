import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import {Link} from 'react-router-dom';



const Navbar = ({user, setUser}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return(
        <nav>
            <div>
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
            </div>
            
        </nav>
    );

};

export default Navbar;
