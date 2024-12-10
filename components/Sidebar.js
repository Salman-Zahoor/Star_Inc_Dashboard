import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import menuItems from './MenuItems';
import sideBarLogo from '../assets/images/sidebarlogo.png';
import { useRouter } from 'next/router';
import logout from '../assets/images/icons/logout.png';
import logoutPop from '../assets/images/logout-pop.png';
import { FaTimes } from "react-icons/fa";

export default function Sidebar({ isOpen }) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = async () => {
        localStorage.removeItem('myData');
        // localStorage.removeItem('fullName');
        // localStorage.removeItem('email');
        // localStorage.removeItem('token');
        // localStorage.removeItem('role');
        // localStorage.removeItem('schoolName');

        // set jToken, role, userId in cookie
        document.cookie = 'jToken=expired; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // document.cookie = 'role=expired; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // document.cookie = 'userId=expired; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        router.push('/')
    };

    return (
        <>
            {isOpen &&
                <aside className="w-24 md:w-2/12 bg-cover bg-right py-5 space-y-10 shadow-lg bg-[#fff]">
                    <div className='flex justify-center'>
                        <Image src={sideBarLogo} alt="SideBar Image" width={207} height={99} priority={true} className='w-[207px]' />
                    </div>
                    <nav>
                        <ul className="flex flex-col gap-1">
                            {menuItems.map(({ url, title, id, icon }) => (
                                <li key={id} className={`${router.route === url ? 'sideBarActive' : 'md:bg-colorThemeSecondary md:bg-opacity-70 hover:md:bg-red-100 md:backdrop-blur-lg'} w-full flex items-center justify-center md:justify-start transition-all ease-in-out duration-200 sideBarli relative`}>
                                    <Link href={url} className='w-full flex items-center md:p-4 gap-1'>
                                        <div className='flex items-center w-12 h-12 m-auto md:m-0'>
                                            <div className={`flex items-center justify-center h-12 w-10 bg-transparent rounded-lg p-2`}>
                                                <Image src={icon} alt="SideBar Icons" width={40} height={40} priority className='w-full h-auto' />
                                            </div>
                                        </div>
                                        <span className='hidden md:block text-base lg:text-m  font-normal text-[#5E5E5E] uppercase !leading-tight '>{title}</span>
                                    </Link>
                                </li>
                            ))}
                            <li className={`md:bg-colorThemeSecondary md:bg-opacity-70 hover:md:bg-red-100 md:backdrop-blur-lg w-full flex items-center justify-center md:justify-start transition-all ease-in-out duration-200 sideBarli relative cursor-pointer`} onClick={() => setIsModalOpen(true)}>
                                <div className='w-full flex items-center md:p-4 gap-1'>
                                    <div className='flex items-center w-12 h-12 m-auto md:m-0'>
                                        <div className={`flex items-center justify-center h-12 w-10 bg-transparent rounded-lg p-2`}>
                                            <Image src={logout} alt="SideBar Icons" width={40} height={40} priority className='w-full h-auto' />
                                        </div>
                                    </div>
                                    <span className='hidden md:block text-base lg:text-m  font-normal text-[#5E5E5E] uppercase !leading-tight '>Log Out</span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </aside>
            }
            {
                isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="fixed inset-0 bg-black opacity-70 blur-l"></div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all min-h-[400px] w-full lg:w-[500px] ">
                            <div className="w-full min-h-[400px] flex flex-col justify-center items-center relative">
                                <Image width={85} height={85} src={logoutPop} />
                                <h2 className="text-xl font-medium text-left text-[#999999] mt-10">Are You Sure You Want To Logout?</h2>
                                <div className='mt-10 space-x-5 flex'>
                                    <button className='w-[168px] h-[54px] bg-[#223575] rounded-full text-[#fff] hover:bg-blue-900' onClick={handleLogout}>Yes</button>
                                    <button className='w-[168px] h-[54px] bg-[#FE665C] rounded-full text-[#fff] hover:bg-red-400' onClick={() => setIsModalOpen(false)}>No</button>
                                </div>
                                <div className="absolute top-[20px] right-[20px] bg-[#FE665C] w-[56px] h-[56px] flex justify-center items-center rounded-full cursor-pointer" onClick={() => setIsModalOpen(false)}>
                                    <FaTimes className="text-xl text-[#fff]" />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}