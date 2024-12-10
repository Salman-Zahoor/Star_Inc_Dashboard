import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import { TfiEmail } from "react-icons/tfi";
import { LuKeySquare } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";
import Login from "../components/auth/Login";
// import ForgotPassOne from "../components/auth/ForgotPassOne"
// import ForgotPassTwo from "../components/auth/ForgotPassTwo"
// import ForgotPassThree from "../components/auth/ForgotPassThree"

export default function Home() {
  return (
    <>
      <Login/>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.jToken;

  if (token) {
    return {
      redirect: {
        destination: `/dashboard`,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  };
}
