import './Nav.scss';
import React, { useEffect } from 'react';
import {Link, useLocation } from 'react-router-dom';


function Nav({setModal}){
    const location = useLocation();
    useEffect(() => {
        setModal(false);
    }, [location.pathname, setModal]);

    // const handleLogout = () => {
	// 	setUser(null);
	// 	return <Navigate to="/" />;
	// };

    return (
        <div className='nav'>
            <Link to='/main'><span className="material-symbols-outlined nav__icon">home</span></Link>
            <Link to='/matches'><span className="material-symbols-outlined nav__icon">favorite</span></Link>
            <Link to='/messages'><span className="material-symbols-outlined nav__icon">forum</span></Link>
            <Link to='/profile'><span className="material-symbols-outlined nav__icon">person</span></Link>
            <Link to='/logout'><span className="material-symbols-outlined nav__icon">logout</span></Link>
        </div>
    );
}

export default Nav;