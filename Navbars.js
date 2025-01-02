import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reduxStore/reducer/authReducer'; 

const Navbars = () => {
   
    const { user } = useSelector((state) => state.user); 
    const dispatch = useDispatch(); 

    
    const handleLogout = () => {
        dispatch(logout()); 
    };

    return (
            <div className="bg-black flex items-center">
                <Container>
                    <h1 className="text-yellow-300 font-bold text-2xl text-center mt-8">
                        Welcome, {user ? user.username : 'Guest'}!
                    </h1>

                    {!user ? (
                        <div className="flex justify-center gap-6 m-8">
                            <Link to="/register">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded">
                                    Register
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded">
                                    Login
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center m-8 gap-9">
                            <Link
                                to="/products"
                                className="text-white bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-2 rounded"
                            >
                                Products
                            </Link>

                            <Link
                                to="/users"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded"
                            >
                                Users
                            </Link>

                            <Link
                                to="/"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded"
                                onClick={handleLogout}
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </Container>
            </div>
    
    );
};

export default Navbars;
