import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='bg-primary py-4 fixed w-full '>
            <ul className='max-width flex flex-wrap gap-x-6 gap-y-2 text-white justify-center'>
                <li className='hover:text-gray-300 duration-300'><Link to='/upload'>Upload</Link></li>
                <li className='hover:text-gray-300 duration-300'><Link to='/analytics'>Analytics</Link></li>
                <li className='hover:text-gray-300 duration-300'><Link to='/dashboard'>Dashboard</Link></li>
                <li className='hover:text-gray-300 duration-300'><Link to='/dashboard'>Designs</Link></li>
                <li className='hover:text-gray-300 duration-300'><Link to='/dashboard'>Industries</Link></li>
                <li className='hover:text-gray-300 duration-300'><Link to='/dashboard'>Price List</Link></li>
                <li className='hover:text-gray-300 duration-300'><Link to='/dashboard'>Project</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
