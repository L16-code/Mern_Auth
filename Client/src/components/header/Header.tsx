import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../state_Management/store/store';
import { logout } from '../../state_Management/actions/rootReducer';
// import { RootState } from '../../state_management/reducers';
// import { useDispatch } from 'react-redux';
// import { logOutAction } from '../../state_management/actions/AuthActions';

interface HeaderProps {
    isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = () => {
    const dispatch=useDispatch();
    // const { isLoggedIn } = useSelector((state: RootState) => state.authReducers);
  const isAuthenticated = useSelector((state: RootState) => state.root.isAuthenticated);

    return (
        <nav>
            <Link to="/">Home</Link>
            {isAuthenticated && (
                <>
                    <Link to="/profile">Profile</Link>
                </>
            )}
            {isAuthenticated ? (
                <Link to="/" onClick={() => { dispatch(logout())}}>Logout</Link>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
};

export default Header;
