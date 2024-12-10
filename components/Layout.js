import { useRouter } from 'next/router';
import Image from 'next/image';
import loginSidebarImage from '../assets/images/newloginsidebar.png';
import loginLogoImage from '../assets/images/loginlogo.png';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';


export default function Layout({ children }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className='min-h-screen'>
            {['/', '/verifyEmail', '/verifyOTP', '/forgotPassword'].includes(router.pathname) ?
            <div className='flex min-h-screen'>
                <aside className="hidden md:w-8/12 md:flex items-center justify-center bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${loginSidebarImage.src})` }}>
                <Image src={loginLogoImage} alt="SideBar Image" width={541} height={257} priority={true} className='relative w-full max-w-lg shrink-0' />
                </aside>
                <div className='w-full md:w-6/12'>
                    <main>{children}</main>
                </div>
            </div> :
            <div className='flex h-screen overflow-hidden'>
                <Sidebar isOpen={isOpen} />
                <div className='relative flex-1 flex flex-col overflow-auto'>
                    <div className="backdrop-blur-lg sticky top-0 z-20 border-b border-gray-200 px-10 py-5">
                        <Header toggleSidebar={toggleSidebar} />
                    </div>
                    <main className='flex-1'>{children}</main>
                </div>
            </div>
            }
        </div>
    )
}