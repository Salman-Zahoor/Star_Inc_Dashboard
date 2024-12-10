import Image from "next/image";
import Layout from "@/components/Layout";
import { TfiEmail } from "react-icons/tfi";
import { LuKeySquare } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";
import { BsEnvelope } from "react-icons/bs";
import { IoMdEyeOff,IoIosEye } from "react-icons/io";
import { useState } from "react";
import popup1 from '../../assets/images/popup1.png';
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Login() {
    const [password, setPassword] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
    const handlePassSubmit = (event) => {
      event.preventDefault();
      setIsModalOpen(true)
      const timeout = setTimeout(() => {
        router.push('/');
      }, 5000);
    }
    
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-full max-w-2xl p-20 transform -translate-x-40 space-y-8 bg-white rounded-lg" style={{ boxShadow: '10px -10px 20px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1)' }}>
          <div>
            <h2 className="text-4xl font-bold text-left text-[#223575]">PASSWORD RECOVERY</h2>
            <p className="mt-5 text-m leading-loose font-light text-left text-gray-500">
              Lorem Ipsum is simply dummy text of the printing and <br/> typesetting industry.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handlePassSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="text-gray-600 text-l font-semibold block mb-2">Password</label>
                <div className="flex items-center border border-gray-100 h-24 border-l-4 border-l-red-400 rounded-md p-8 relative">
                  <LuKeySquare className='text-4xl text-gray-500 ' />
                  <input
                    id="password"
                    name="password"
                    type={password ? "password" : "text"}
                    required
                    className="ml-3 flex-1 block w-full font-normal px-6 py-2 border-l-2 border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter New Password*"
                  />
                {password ? <IoMdEyeOff className="text-[#A8A8A8] text-2xl cursor-pointer" onClick={()=>setPassword(!password)}/> : <IoIosEye className="text-[#A8A8A8] text-2xl cursor-pointer" onClick={()=>setPassword(!password)}/>}
                </div>
              </div>
              <div>
                <label htmlFor="password" className="text-gray-600 text-l font-semibold block mb-2">Confirm Password</label>
                <div className="flex items-center border border-gray-100 h-24 border-l-4 border-l-red-400 rounded-md p-8 relative">
                  <LuKeySquare className='text-4xl text-gray-500 ' />
                  <input
                    id="password"
                    name="password"
                    type={confirmPassword ? "password" : "text"}
                    required
                    className="ml-3 flex-1 block w-full font-normal px-6 py-2 border-l-2 border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Confirm Password*"
                  />
                {confirmPassword ? <IoMdEyeOff className="text-[#A8A8A8] text-2xl cursor-pointer" onClick={()=>setConfirmPassword(!confirmPassword)}/> : <IoIosEye className="text-[#A8A8A8] text-2xl cursor-pointer" onClick={()=>setConfirmPassword(!confirmPassword)}/>}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-6 gap-7">
              <button
                type="submit"
                className="relative flex items-center text-xl mt-8 justify-center w-48 h-16 px-4 py-2 text-md font-medium text-white bg-[#223575] border border-transparent rounded-md group hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                
              >
                Update
              </button>
              <button
                onClick={()=>router.push("/")}
                className="relative flex items-center text-xl mt-8 justify-center w-75 h-16 px-4 py-2 text-md font-medium text-white bg-[#707070] border border-transparent rounded-md group hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back To Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-70 blur-l"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all min-h-[531px] w-full lg:w-[890px] ">
            <div className="w-full min-h-[531px] flex flex-col justify-center items-center relative">
              <Image width={413} height={288} src={popup1}/>
              <h2 className="text-4xl font-bold text-left text-[#223575]">Password Updated Successfully</h2>
              <p className="mt-5 text-m leading-loose font-light text-left text-gray-500">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <div className="absolute top-[20px] right-[20px] bg-[#FE665C] w-[56px] h-[56px] flex justify-center items-center rounded-full cursor-pointer" onClick={()=>router.push('/')}> 
                <FaTimes className="text-xl text-[#fff]"/>
              </div>
            </div>
          </div>
        </div>
      )}
      </>

    
  );
}
