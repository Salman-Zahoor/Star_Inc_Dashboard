import Image from "next/image";
import Layout from "@/components/Layout";
import { TfiEmail } from "react-icons/tfi";
import { LuKeySquare } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";
import { BsEnvelope } from "react-icons/bs";
import { IoMdEyeOff, IoIosEye } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchApi } from "@/fetchApi";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();

  const initialValues = {
    email: '',
    password: ''
  };

  const [form, setForm] = useState(initialValues);
  const [password, setPassword] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const platform = 'browser';

    const [data, error] = await fetchApi({
      method: 'POST',
      endPoint: 'auth/login',
      data: {
        email: form.email,
        password: form.password
      },
    });

    if (error) {
      toast.error(error.response ? error?.response?.data?.error : error.message);
      return;
    }

    // if (data.data?.user?.role === 'employee') {
    //   toast.error('You are not authorized to access this page');
    //   return;
    // }

    // set token in cookie
    document.cookie = `jToken=${data.data.token}; path=/`;
    localStorage.setItem('myData', JSON.stringify(data.data.user));

    // set role in cookie
    // document.cookie = `role=${data.data?.user?.role}; path=/`;
    // set id in cookie
    // document.cookie = `userId=${data.data?.user?._id}; path=/`;

    // set login data in local storage
    // localStorage.setItem('fullName', data.data?.user?.firstName);
    // localStorage.setItem('firstName', data.data?.user?.firstName);
    // localStorage.setItem('lastName', data.data?.user?.lastName);
    // localStorage.setItem('email', data.data?.user?.email);
    // localStorage.setItem('role', data.data?.user?.role);
    // localStorage.setItem('token', data.data?.accessToken);
    // localStorage.setItem('image', data.data?.user?.image);

    // update user context
    // setUser({
    //   fullName: data.data?.user?.firstName,
    //   email: data.data?.user?.email,
    //   token: data.data?.accessToken,
    //   role: data.data?.user?.role,
    //   image: data.data?.user?.image,
    // })

    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-2xl p-20 transform -translate-x-40 space-y-8 bg-white rounded-lg" style={{ boxShadow: '10px -10px 20px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1)' }}>
        <div>
          <h2 className="text-4xl font-bold text-left text-[#223575]">LOG IN</h2>
          <p className="mt-5 text-m leading-loose font-light text-left text-gray-500">
            Lorem Ipsum is simply dummy text of the printing and <br /> typesetting industry.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="text-gray-600 text-l font-semibold block mb-2">Email Address</label>
              <div className="flex items-center border border-gray-100 border-l-4 border-l-red-400 w-auto h-24 rounded-md p-8">
                <BsEnvelope className='text-4xl text-gray-500' />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="ml-3 flex-1 block w-full font-normal  px-3 py-2 border-l-2 border-gray-200  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Email Address*"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="text-gray-600 text-l font-semibold block mb-2">Password</label>
              <div className="flex items-center border border-gray-100 h-24 border-l-4 border-l-red-400 rounded-md p-8 relative">
                <LuKeySquare className='text-4xl text-gray-500 ' />
                <input
                  id="password"
                  name="password"
                  type={password ? "password" : "text"}
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="ml-3 flex-1 block w-full font-normal px-6 py-2 border-l-2 border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Password*"
                />
                {password ? <IoMdEyeOff className="text-[#A8A8A8] text-2xl cursor-pointer" onClick={() => setPassword(!password)} /> : <IoIosEye className="text-[#A8A8A8] text-2xl cursor-pointer" onClick={() => setPassword(!password)} />}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center mt-8">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="block ml-2 font-semibold text-md text-gray-500">
                Remember me
              </label>
            </div>
            <div className="text-sm mt-8">
              <Link href="verifyEmail" className="font-semibold text-gray-500 hover:text-[#223575]">
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              type="submit"
              className="relative flex items-center text-xl mt-8 justify-center w-48 h-16 px-4 py-2 text-md font-medium text-white bg-[#223575] border border-transparent rounded-md group hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <LuLogIn className="text-2xl mr-2" />
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
