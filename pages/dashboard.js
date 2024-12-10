import { Fragment, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import chat1 from "../assets/images/chat1.png";
import { useRouter } from "next/router";
import _ from "lodash";
import io from "socket.io-client";
import Image from "next/image";
import avatarImage from "../assets/images/user-default.png";
import chatNotSelected from '../assets/images/empty-chat.webp';
import moment from "moment";

const LineChart = dynamic(() => import("../components/LineChart.js"), {
  ssr: false,
});

export default function ForgotPassOnePage({ token }) {
  const router = useRouter();

  // const mee = JSON.parse(localStorage.getItem('myData'));

  const [socket, setSocket] = useState(null);

  const [queueChats, setQueueChats] = useState([]);

  socket?.on("guestUserList", (guestUsers) => {
    setQueueChats(guestUsers);
  });

  const handleSelectGuest = (userId) => {
    socket?.emit('selectGuest', { guestId: userId });

    router.push(`/conversations?id=${userId}`);
  };

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_BASEURL, {
      auth: {
        token,
      },
      reconnection: true, // Enable reconnection
      reconnectionAttempts: 5, // Number of attempts before giving up
      reconnectionDelay: 1000, // Initial delay before attempting to reconnect (ms)
      reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts (ms)
    });

    setSocket(newSocket);

    // return () => {
    //   newSocket.close(); // Clean up socket on component unmount
    // };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleDisconnect = () => {
      console.log("Disconnected from server");
      // You can perform any necessary cleanup or UI updates here
    };

    const handleReconnect = () => {
      console.log("Reconnected to server");
      // You can perform any necessary actions after successful reconnection
    };

    socket?.on("disconnect", handleDisconnect);
    socket?.on("reconnect", handleReconnect);

    return () => {
      socket?.off("disconnect", handleDisconnect);
      socket?.off("reconnect", handleReconnect);
    };
  }, [socket]);

  return (
    <div className="w-full py-20 px-10 flex">
      {/* queue chats */}
      <div className="w-6/12">
        <div className="w-auto h-full flex flex-col box-shadow rounded-lg mr-5">
          <div className="flex items-center gap-4 p-10">
            <h4 className="text-2xl font-bold uppercase">Queue Chats</h4>
            {/* blink animation */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-colorPrimary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-colorPrimary"></span>
            </span>
          </div>
          <div className="max-h-[900px] space-y-4 overflow-auto p-10 pt-0">
            {
              queueChats && queueChats.length > 0 && queueChats.map((chat, index) => (
                <div onClick={() => handleSelectGuest(chat.user.guestId)} className="flex items-center border border-gray-200 rounded-xl p-4 gap-4 cursor-pointer hover:shadow-lg transition-all ease-in-out duration-200">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-md shrink-0">
                    <Image
                      alt={chat.user.role === 'guest' ? 'Guest' : (chat.user.firstName || '')}
                      fill
                      className="object-cover"
                      {...(chat.user.image
                        ? {
                          src: `${process.env.NEXT_PUBLIC_BASEURL}/${chat.user.image}`,
                        }
                        : { src: avatarImage })}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="w-full flex items-start justify-end gap-1">
                      <div className="flex-1 leading-none">
                        <h3 className='flex-1 text-colorThemePrimary text-lg font-semibold capitalize leading-tight truncate'>{chat.user.role === 'guest' ? 'Guest' : ((chat.user.firstName || '') + " " + (chat.user.lastName || ''))}</h3>
                        {
                          chat.user.role === 'guest' &&
                          <span className="text-[10px] text-gray-500">{chat.user.guestId}</span>
                        }
                      </div>
                      {/* <span className="text-xs text-gray-500">{moment(user.date).format('lll')}</span> */}
                      <span className="text-xs text-gray-500">{moment(chat.message.createdAt).format('lll')}</span>
                    </div>
                    <p className="line-clamp-2 text-sm text-gray-500">{chat.message.content}</p>
                  </div>
                </div>
              ))
            }
            {
              queueChats && queueChats.length < 1 &&
              <div className="flex flex-col items-center justify-center">
                <Image src={chatNotSelected} alt="no chats available" width={400} height={400} className="w-full max-w-xs h-auto opacity-60" />
                <p>No chats available!</p>
              </div>
            }
          </div>
        </div>
      </div>

      {/* active user and statistic */}
      <div className="w-6/12">
        <div className="w-auto box-shadow rounded-lg p-10 ml-5">
          <div className="flex justify-between mb-4">
            <h4 className="text-2xl font-bold uppercase">Active User</h4>
            <h6 className="uppercase">Completed Chat</h6>
          </div>
          <div>
            <div className="flex justify-between border-b-2 border-[#B9B9B9] py-3">
              <div className="flex items-center">
                <img src={chat1.src} alt="img" />
                <h5>User One</h5>
              </div>
              <div className="flex items-center">
                <h6 className="mr-10">05</h6>
              </div>
            </div>
            <div className="flex justify-between border-b-2 border-[#B9B9B9] py-3">
              <div className="flex items-center">
                <img src={chat1.src} alt="img" />
                <h5>User Two</h5>
              </div>
              <div className="flex items-center">
                <h6 className="mr-10">05</h6>
              </div>
            </div>
            <div className="flex justify-between py-3">
              <div className="flex items-center">
                <img src={chat1.src} alt="img" />
                <h5>User Three</h5>
              </div>
              <div className="flex items-center">
                <h6 className="mr-10">05</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="w-auto box-shadow rounded-lg p-10 ml-5 mt-10">
          <LineChart />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.jToken;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { token }
  }
}
