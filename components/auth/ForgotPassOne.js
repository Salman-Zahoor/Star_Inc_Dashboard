import Image from "next/image";
import Layout from "@/components/Layout";
import { TfiEmail } from "react-icons/tfi";
import { LuKeySquare } from "react-icons/lu";
import { BsEnvelope } from "react-icons/bs";
import { LuLogIn } from "react-icons/lu";
import { useRouter } from "next/router";

export default function ForgotPassOne() {
  const router = useRouter()
  const handleEmailSubmit = (event) => {
    event.preventDefault();
    router.push('/verifyOTP')
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-full max-w-2xl p-20 font-bold transform -translate-x-40 space-y-8 bg-white rounded-lg" style={{ boxShadow: '10px -10px 20px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1)' }}>
          <div>
            <h2 className="text-4xl font-bold text-left text-[#223575]">Password Recovery</h2>
            <p className="mt-5 text-m leading-loose font-normal text-left text-gray-400">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="text-gray-600 text-l font-semiabold block mb-2">Email Address</label>
                <div className="flex items-center border border-gray-100 border-l-4 border-l-red-400 w-auto h-24 rounded-md p-8">
                <BsEnvelope className='text-4xl text-gray-500'/>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    className="ml-3 flex-1 block w-full font-normal px-3 py-2 border-l-2 border-gray-200  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter Email Address*"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-6 gap-7">
              <button
                type="submit"
                className="relative flex items-center text-xl mt-8 justify-center w-48 h-16 px-4 py-2 text-md font-medium text-white bg-[#223575] border border-transparent rounded-md group hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue
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
    </>
  );
}
