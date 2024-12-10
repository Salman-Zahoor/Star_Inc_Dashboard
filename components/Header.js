import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
// import BasicBreadcrumbs from './Breadcrumbs';
// import Logout from './Logout';
import { FaBars } from 'react-icons/fa';
import { FaBell } from "react-icons/fa";



const Header = () => {
    const router = useRouter();

    const getTitle = (path) => {
        switch (path) {
        case '/dashboard':
            return 'Dashboard';
        case '/conversations':
            return 'Conversations';
        case '/starsUsers':
            return 'Stars Users';
        case '/archive':
            return 'Archive';
        case '/statistics':
            return 'statistics';
        case '/client-referrals':
            return 'client referrals';
        case '/settings':
            return 'settings';
        default:
            return 'Page';
        }
    };

  const title = getTitle(router.pathname);

    return (
        <header className='flex justify-between items-center'>
            <div className="flex items-center space-x-3 justify-end">
                {/* <FaBars className="text-2xl cursor-pointer" onClick={toggleSidebar} /> */}
                <span className='text-gray-700 text-2xl'>
                    <h2 className='text-5xl font-bold text-[#223575] uppercase'>{title}</h2>
                </span>
            </div>
            <div className='flex justify-end  items-center space-x-2'>
                <FaBell className='text-2xl text-[#FE665C]' />
            </div>
        </header>
    )
}

export default Header