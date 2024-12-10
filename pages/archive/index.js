import { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import _ from 'lodash';
import io from 'socket.io-client';
import Image from "next/image";
import { Icon } from "@iconify-icon/react";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { ROLES, SUB_ROLES } from "@/utils/constant";
import chatNotSelected from '../../assets/images/empty-chat.webp';
import avatarImage from '../../assets/images/user-default.png';

const Archive = () => {
    const router = useRouter();
    // const dispatch = useDispatch();
    // const userId = router.query.id;

    const [socket, setSocket] = useState(null);

    const chatContainerRef = useRef(null);
    const rolesArr = _.values({ all: 'all', ...ROLES, ...SUB_ROLES }).filter(role => role !== ROLES.employee);

    // const { employees } = useSelector(state => state.employee);

    const [state, setState] = useState({
        selectedRole: 'all',
        inputSearch: '',
        openModal: false,
        inputField: '',
        rows: 1,
        myData: {},
    });

    const [recentChats, setRecentChats] = useState([]);
    const [filteredChats, setFilteredChats] = useState([]);
    // const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);

    socket?.on('pastUsers', (pastUsers) => {
        setRecentChats(pastUsers);
    });

    socket?.on('pastChats', (pastChats) => {
        if (me && pastChats.some((e) => (e.receiver === userId || e.sender === userId)) && pastChats.some((e) => (e.receiver === me || e.sender === me))) {
            setMessages(pastChats);
        }
    });

    socket?.on('newMessage', (newMessage) => {
        if (me && newMessage.some((e) => (e.receiver === userId || e.sender === userId)) && newMessage.some((e) => (e.receiver === me || e.sender === me))) {
            setMessages(newMessage);
        }
        socket?.emit('getPastUsers', { currentUserId: me });
    });

    const handleNewChat = async (sender, receiver) => {
        if (sender && receiver) {
            setMessages([]);
            const myData = await employees.find(e => e._id === sender);
            const receiverData = await employees.find(e => e._id === receiver);

            setState((old) => ({ ...old, openModal: false, myData: myData }));
            setSelectedUser(receiverData);
            // setRecentChats([ ...recentChats, receiverData ]);

            socket?.emit('getPastChats', { sender, receiver });
        } else {
            setSelectedUser(null);
            setMessages([]);
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        return;

        if (state.inputField !== '') {
            socket?.emit('sendMessage', { sender: me, receiver: userId, message: state.inputField });
            setState((old) => ({ ...old, inputField: '', rows: 1 }));
            socket?.emit('getPastUsers', { currentUserId: me });
        }
    };

    // const handleInputChange = (e) => {
    //     const inputText = e.target.value;
    //     const lines = inputText.split('\n').length;
    //     const inputRows = Math.min(Math.max(lines, 1), 4);

    //     setState((old) => ({ ...old, inputField: inputText, rows: inputRows }));
    // };

    const handleInputChange = (e) => {
        const inputText = e.target.value;
        const textarea = e.target;

        // If input text is empty, set rows to 1
        if (inputText.trim() === '') {
            textarea.rows = 1;
        } else {
            const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
            const paddingTop = parseInt(getComputedStyle(textarea).paddingTop);
            const paddingBottom = parseInt(getComputedStyle(textarea).paddingBottom);
            const totalPadding = paddingTop + paddingBottom;

            // Calculate the number of rows based on the content height and line height
            const lines = Math.floor((textarea.scrollHeight - totalPadding) / lineHeight);

            // Set a maximum number of rows
            const maxRows = 4;

            // Update the textarea rows based on the number of lines
            textarea.rows = Math.min(lines, maxRows);
        }

        setState((old) => ({ ...old, inputField: inputText, rows: textarea.rows }));
    };

    const handleSearch = (e) => {
        const searchText = e.target.value.trim().toLowerCase();
        setState((old) => ({ ...old, selectedRole: 'all', inputSearch: searchText }));

        return;

        if (searchText) {
            const filteredChats = recentChats.filter(chat =>
                chat.firstName?.toLowerCase().includes(searchText) || chat.lastName?.toLowerCase().includes(searchText)
            );
            setFilteredChats(filteredChats);
        } else {
            setFilteredChats([]);
        }
    };

    const handleRoleChange = (e) => {
        const selectRole = e.target.value;
        setState((old) => ({ ...old, inputSearch: '', selectedRole: selectRole }));

        return;

        if (selectRole) {
            const filteredChats = recentChats.filter(chat =>
                chat?.roleType === selectRole || chat?.role === selectRole
            );
            setFilteredChats(filteredChats);
        } else {
            setFilteredChats([]);
        }
    };

    // useEffect(() => {
    //     handleNewChat(me, userId);
    //     socket?.emit('getPastUsers', { currentUserId: me });
    // }, [userId, me, employees]);

    useEffect(() => {
        if (selectedUser) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // useEffect(() => {
    //     dispatch(getAllEmployees(token));
    // }, [dispatch]);

    useEffect(() => {
        const newSocket = io(process.env.NEXT_PUBLIC_BASEURL, {
            reconnection: true, // Enable reconnection
            reconnectionAttempts: 5, // Number of attempts before giving up
            reconnectionDelay: 1000, // Initial delay before attempting to reconnect (ms)
            reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts (ms)
        });

        setSocket(newSocket);

        return () => {
            newSocket.close(); // Clean up socket on component unmount
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleDisconnect = () => {
            console.log('Disconnected from server');
            // You can perform any necessary cleanup or UI updates here
        };

        const handleReconnect = () => {
            console.log('Reconnected to server');
            // You can perform any necessary actions after successful reconnection
        };

        socket?.on('disconnect', handleDisconnect);
        socket?.on('reconnect', handleReconnect);

        return () => {
            socket?.off('disconnect', handleDisconnect);
            socket?.off('reconnect', handleReconnect);
        };
    }, [socket]);

    // DUMMY DATA START
    const me = 111;
    const userId = 123;
    const employees = [];
    const myDummyData = {
        firstName: 'Paul',
        lastName: 'Walker',
        email: 'paulwalker@example.com',
    };
    const dummyUsersArr = [
        {
            id: 123,
            _id: 123,
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            date: 'June 14, 2024',
        },
        {
            id: 456,
            _id: 456,
            firstName: 'John',
            lastName: 'Smith',
            email: 'johndoe@example.com',
            date: 'June 14, 2024',
        },
        {
            id: 789,
            _id: 789,
            firstName: 'Sara',
            email: 'johndoe@example.com',
            date: 'June 14, 2024',
        }
    ];
    const selectedUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
    };
    useEffect(() => {
        setMessages([
            {
                sender: 111,
                receiver: 123,
                updatedAt: 'June 14, 2024',
                message: 'Hello! How may I help you?'
            },
            {
                sender: 123,
                receiver: 111,
                updatedAt: 'June 14, 2024',
                message: 'Yes sure'
            },
            {
                sender: 111,
                receiver: 123,
                updatedAt: 'June 14, 2024',
                message: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
            },
            {
                sender: 123,
                receiver: 111,
                updatedAt: 'June 14, 2024',
                message: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
            },
        ]);
    }, []);
    // DUMMY DATA END

    const EMPTY_CHATS = () => (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <p>No chats available!</p>
            <div
                onClick={() => setState((old) => ({ ...old, openModal: true }))}
                className="text-colorPrimary underline cursor-pointer"
            >
                Start new chat
            </div>
        </div>
    );

    const USER_CARD = ({ user }) => (
        <div
        // onClick={() => router.push(`/chat?id=${user?._id}`)}
        className={`${user?._id === userId ? 'bg-red-50' : 'bg-colorThemeSecondary hover:bg-red-50'} w-full cursor-pointer p-5 transition-all ease-in-out duration-150`}
        >
            <div className='flex items-center gap-4'>
                <div className='relative w-12 h-12 rounded-full overflow-hidden shadow-md shrink-0'>
                    <Image
                        alt={user.firstName}
                        fill
                        className="object-cover"
                        {...user.image ? { src: `${process.env.NEXT_PUBLIC_BASEURL}/${user.image}` } : { src: avatarImage }}
                    />
                </div>
                <div className="flex-1 truncate">
                    <div className="flex items-start justify-end gap-1">
                        <h3 className='flex-1 text-colorThemePrimary text-lg font-semibold capitalize leading-tight truncate'>{(user.firstName || '') + " " + (user.lastName || '')}</h3>
                        {/* <span className="text-xs text-gray-500">{moment(user.date).format('lll')}</span> */}
                        <span className="text-xs text-gray-500">{user.date}</span>
                    </div>
                    <p className='text-sm truncate'>{user.email}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-11/12 max-w-[1300px] h-full m-auto pt-10 sm:pt-20">
            <div className='w-full h-full flex flex-col gap-8'>
                <h1 className='headingPrimary uppercase'>Archive Chat</h1>
                <div className="relative flex-1 grid grid-cols-12 lg:gap-10 overflow-hidden">
                    {/* recent chat sidebar */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-3 overflow-auto pt-2">
                        {/* search and add */}
                        <div className="flex flex-row items-center gap-2">
                            <div className="flex-1 w-full">
                                <TextField
                                    name="search"
                                    size="small"
                                    placeholder="Search"
                                    value={state.inputSearch}
                                    onChange={handleSearch}
                                    // disabled={recentChats.length < 1}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "50px"
                                        },
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                                <Icon icon="iconamoon:search-light" />
                                          </InputAdornment>
                                        ),
                                      }}
                                    className='w-full max-w-md bg-colorThemeSecondary rounded-full hover:shadow-lg transition-all ease-in-out duration-300 lg:m-auto'
                                />
                            </div>
                            {/* {
                                Permissions.create &&
                                <button
                                    onClick={() => setState((old) => ({ ...old, openModal: true }))}
                                    className="w-max buttonPrimarySmall flex items-center sm:gap-1 shrink-0">
                                    <span className="hidden sm:block">New Chat</span>
                                    <Icon icon="octicon:plus-24" className='w-6 h-auto shrink-0' />
                                </button>
                            } */}
                        </div>
                        <hr />
                        {/* role filter */}
                        <div className="flex items-center justify-between">
                            <h2>Recent Talk</h2>
                            {/* role filter */}
                            <div>
                                <TextField
                                    fullWidth
                                    select
                                    value={state.selectedRole}
                                    onChange={handleRoleChange}
                                    size='small'
                                    // disabled={recentChats.length < 1}
                                    className="rounded-lg capitalize"
                                    sx={{
                                        "& .MuiInputBase-input": {
                                            paddingTop: 0,
                                            paddingBottom: 0,
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: '0px !important',
                                        },
                                    }}
                                >
                                    {
                                        rolesArr.map((role, index) => (
                                            <MenuItem key={index} value={role} className="capitalize">{role}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </div>
                        </div>
                        {/* recent chat cards */}
                        <div className="flex-1 flex flex-col-reverse justify-end border border-grey-300 divide-y divide-y-reverse divide-gray-300 overflow-auto customScrollBar pb-10">
                            {/* {
                                (state.selectedRole !== 'all' || state.inputSearch !== '') && filteredChats.length > 0 && filteredChats.map((user, index) => (
                                    <Fragment key={index}>
                                        <USER_CARD user={user} />
                                    </Fragment>
                                ))
                            }
                            {
                                state.selectedRole === 'all' && state.inputSearch === '' && recentChats.length > 0 && recentChats.map((user, index) => (
                                    <Fragment key={index}>
                                        <USER_CARD user={user} />
                                    </Fragment>
                                ))
                            } */}
                            {/* DUMMY START */}
                            {
                                dummyUsersArr.map((user, index) => (
                                    <Fragment key={index}>
                                        <USER_CARD user={user} />
                                    </Fragment>
                                ))
                            }
                            {/* DUMMY END */}
                            {/* {
                                (recentChats.length < 1 || ((state.selectedRole !== 'all' || state.inputSearch !== '') && filteredChats.length < 1)) &&
                                <EMPTY_CHATS />
                            } */}
                        </div>
                    </div>
                    {/* chat box */}
                    <div className={`${selectedUser ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} absolute lg:relative z-10 w-full h-full lg:h-auto col-span-12 lg:col-span-8 mb-5 overflow-hidden transition-all ease-in-out duration-500`}>
                        {
                            selectedUser ? (
                                <div className="w-full h-full flex flex-col bg-colorThemeSecondary border border-gray-300 divide-y divide-gray-300 overflow-auto">
                                    {/* head */}
                                    <div className="flex items-center gap-4 p-5">
                                        <div className='relative w-14 h-14 rounded-full overflow-hidden shadow-md'>
                                            <Image
                                                alt={selectedUser.firstName}
                                                fill
                                                className="object-cover"
                                                {...selectedUser.image ? { src: `${process.env.NEXT_PUBLIC_BASEURL}/${selectedUser.image}` } : { src: avatarImage }}
                                            />
                                        </div>
                                        <h3 className='flex-1 text-colorThemePrimary text-lg font-semibold capitalize leading-tight'>{(selectedUser.firstName || '') + " " + (selectedUser.lastName || '')}</h3>
                                        <div onClick={() => router.push('/conversations')} className="text-red-400 hover:text-red-500 text-sm underline cursor-pointer">Close chat</div>
                                    </div>
                                    {/* body */}
                                    <div ref={chatContainerRef} className="flex-1 space-y-14 overflow-auto p-4 customScrollBar">
                                        {
                                            messages.length > 0 && messages.map((message, index) => (
                                                <div key={index} className={`${message.sender === me ? 'flex-row-reverse' : ''} flex items-start gap-2`}>
                                                    <div className='relative w-10 h-10 rounded-full overflow-hidden shadow-md shrink-0'>
                                                        {
                                                            message.sender === me ? (
                                                                <Image
                                                                    alt={state.myData?.firstName}
                                                                    fill
                                                                    className="object-cover"
                                                                    {...state.myData?.image ? { src: `${process.env.NEXT_PUBLIC_BASEURL}/${state.myData.image}` } : { src: avatarImage }}
                                                                />
                                                            ) : (
                                                                <Image
                                                                    alt={selectedUser.firstName}
                                                                    fill
                                                                    className="object-cover"
                                                                    {...selectedUser.image ? { src: `${process.env.NEXT_PUBLIC_BASEURL}/${selectedUser.image}` } : { src: avatarImage }}
                                                                />
                                                            )
                                                        }
                                                    </div>
                                                    <div className={`${message.sender === me ? 'bg-slate-50' : 'bg-slate-50'} relative min-h-[38px] shadow flex flex-col items-start rounded-2xl px-4 py-2 gap-2`}>
                                                        {
                                                            message.image &&
                                                            <div className="w-full max-w-xs h-auto rounded-lg overflow-hidden">
                                                                <Image
                                                                    alt='image'
                                                                    width={200}
                                                                    height={200}
                                                                    className="w-full h-auto"
                                                                    src={`${process.env.NEXT_PUBLIC_BASEURL}/${message.image}`}
                                                                />
                                                            </div>
                                                        }
                                                        {/* <span className="whitespace-pre-wrap">{dummyUsersArr.find((e) => e.id === message?.sender)?.firstName}</span> */}
                                                        {
                                                            message.sender === me ? (
                                                                <span className="whitespace-pre-wrap">{myDummyData.firstName + ' ' + myDummyData.lastName}</span>
                                                            ) : (
                                                                <span className="whitespace-pre-wrap">{dummyUsersArr.find(e => e.id === message.sender).firstName + ' ' + dummyUsersArr.find(e => e.id === message.sender).lastName}</span>
                                                            )
                                                        }
                                                        {
                                                            message.message &&
                                                            <span className="whitespace-pre-wrap">{message.message}</span>
                                                        }
                                                        {
                                                            message.updatedAt &&
                                                            // <span className="w-full text-xs text-right">{moment(message.updatedAt).format('lll')}</span>
                                                            <span className="absolute -bottom-6 left-0 w-full text-xs text-right">{message.updatedAt}</span>
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        {
                                            messages.length < 1 &&
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
                                                <Icon icon="solar:chat-dots-broken" className="text-4xl" />
                                                <p>Start new chat!</p>
                                            </div>
                                        }
                                    </div>
                                    {/* field */}
                                    <div className="p-5">
                                        <form onSubmit={handleSend}>
                                            <div className="flex items-end gap-4">
                                                <div className="flex-1 flex items-center gap-2">
                                                    <Icon icon="fe:smile" className="text-gray-400 text-2xl cursor-pointer" />
                                                    <textarea
                                                        placeholder="Message"
                                                        value={state.inputField}
                                                        onChange={handleInputChange}
                                                        rows={state.rows}
                                                        className="flex-1 bg-transparent border-none outline-none resize-none customScrollBar"
                                                    ></textarea>
                                                </div>
                                                <button type="submit" className="buttonPrimaryIcon shrink-0">
                                                    <Icon icon="ri:send-plane-fill" className='text-xl' />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center overflow-auto">
                                    <Image src={chatNotSelected} alt="chat not selected" className="w-full max-w-sm opacity-0 lg:opacity-60" />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* {
                state.openModal &&
                <UsersListChatModal open={state.openModal} handleClose={() => setState((old) => ({ ...old, openModal: false }))} me={me} />
            } */}
        </div>
    );
};

export default Archive;

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