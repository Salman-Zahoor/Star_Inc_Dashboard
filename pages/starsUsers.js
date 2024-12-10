import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaTimes } from 'react-icons/fa';
import { IoIosEye, IoMdEyeOff } from 'react-icons/io';
import { fetchApi } from '@/fetchApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '@/redux/slices/users';
import Image from 'next/image';
import { Icon } from '@iconify-icon/react';

const createData = (firstName, phoneNumber, email, activeStatus) => {
    return { firstName, phoneNumber, email, activeStatus };
};

const rows = [
    createData('John Doe', '123-456-7890', 'john.doe@example.com', 'Active'),
    createData('Jane Smith', '987-654-3210', 'jane.smith@example.com', 'Inactive'),
    createData('Alice Johnson', '555-555-5555', 'alice.johnson@example.com', 'Active'),
    createData('Bob Brown', '444-444-4444', 'bob.brown@example.com', 'Inactive'),
];

const starsUsers = ({ token }) => {
    const dispatch = useDispatch();

    const { users, loading } = useSelector(state => state.users);
    // console.log(users, '<0000')

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user',
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [form, setForm] = useState(initialValues);

    const [state, setState] = useState({
        selectedUser: null,
        isModalOpen: false,
        isDeleteModalOpen: false,
        isUpdate: false,
        showPassword: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((old) => ({ ...old, [name]: value }));
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddModal = () => {
        setForm(initialValues);
        setState((old) => ({ ...old, isModalOpen: true, isUpdate: false }));
    };

    const handleEditModal = () => {
        setForm({
            firstName: state.selectedUser.firstName ?? '',
            lastName: state.selectedUser.lastName ?? '',
            email: state.selectedUser.email ?? '',
        });
        setState((old) => ({ ...old, isModalOpen: true, isUpdate: true }));
        handleClose();
    };

    const handleSubmitUser = async (e) => {
        e.preventDefault();

        // const { method, endPoint, post } = isUpdate
        //     ? { method: 'PUT', endPoint: `user/${selectedUser?._id}`, post: postData }
        //     : { method: 'POST', endPoint: 'auth/register', post: postData };

        // const [data, error] = await fetchApi({
        //     method,
        //     endPoint,
        //     token,
        //     data: post
        // });

        const [data, error] = await fetchApi({
            method: 'POST',
            endPoint: 'auth/register',
            token,
            data: form,
        });

        if (error) {
            toast.error(error.response ? error?.response?.data?.error : error.message);
            return;
        }

        toast.success('User created successfully');
        // toast.success(data.message);
        setForm(initialValues);
        setState((old) => ({ ...old, isModalOpen: false }));

        dispatch(getAllUsers());
    };

    const handleDeleteSubmit = () => {
        setState((old) => ({ ...old, isDeleteModalOpen: false }))
    };

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <>
            <div className='w-full py-20 px-10 space-y-10'>
                <div className='flex items-center justify-end'>
                    <button className='buttonPrimary' onClick={handleAddModal}>Add User</button>
                </div>

                <TableContainer component={Paper} className='p-10 muiTable'>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='text-base font-extrabold'>First Name</TableCell>
                                <TableCell className='text-base font-extrabold'>Last Name</TableCell>
                                <TableCell className='text-base font-extrabold'>Phone Number</TableCell>
                                <TableCell className='text-base font-extrabold'>Email Address</TableCell>
                                <TableCell className='text-base font-extrabold'>Role</TableCell>
                                <TableCell className='text-base font-extrabold'>Active Status</TableCell>
                                <TableCell className='text-base font-extrabold' >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className='text-center'>
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <>
                                        {
                                            users && users.length > 0 && users.map((user, index) => (
                                                <TableRow key={user.id}>
                                                    <TableCell component="th" scope="row" className='text-base font-normal capitalize'>
                                                        {user.firstName ? user.firstName : 'Anonymous'}
                                                    </TableCell>
                                                    <TableCell className='text-base font-normal capitalize'>{user.lastName ? user.lastName : '---'}</TableCell>
                                                    <TableCell className='text-base font-normal'>{'---'}</TableCell>
                                                    <TableCell className='text-base font-normal'>{user.email ? user.email : '---'}</TableCell>
                                                    <TableCell className='text-base font-normal capitalize'>{user.role ? user.role : '---'}</TableCell>
                                                    <TableCell className={`${user.isActive ? 'text-[#13BE00]' : 'text-[#FF0000]'} text-base font-normal`}>{user.isActive ? 'Active' : 'In-Active'}</TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            aria-controls="simple-menu"
                                                            aria-haspopup="true"
                                                            onClick={(e) => { handleClick(e); setState((old) => ({ ...old, selectedUser: user })) }}
                                                        >
                                                            <FaEllipsisVertical />
                                                        </IconButton>
                                                        <Menu
                                                            id="simple-menu"
                                                            anchorEl={anchorEl}
                                                            open={Boolean(anchorEl)}
                                                            onClose={handleClose}
                                                        >
                                                            <MenuItem onClick={handleClose}>Details</MenuItem>
                                                            <MenuItem onClick={handleEditModal}>Edit</MenuItem>
                                                            <MenuItem onClick={() => { setState((old) => ({ ...old, isDeleteModalOpen: true })); handleClose() }}>Delete</MenuItem>
                                                        </Menu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }

                                        {
                                            users.length < 1 &&
                                            <TableRow>
                                                <TableCell colSpan={7} className='text-center'>
                                                    No users found!
                                                </TableCell>
                                            </TableRow>
                                        }
                                    </>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/* ADD/UPDATE USER MODAL */}
            {
                state.isModalOpen &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-70 blur-l"></div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full lg:w-[500px]">
                        <div className="w-full flex flex-col justify-center items-center relative p-5 space-y-5">
                            {/* head */}
                            <div className='w-full flex items-center justify-between '>
                                <h2 className='headingsecondary'>{state.isUpdate ? 'Update' : 'Add New'} User</h2>
                                <div className="bg-[#FE665C] w-10 h-10 flex justify-center items-center rounded-full cursor-pointer" onClick={() => setState((old) => ({ ...old, isModalOpen: false }))}>
                                    <FaTimes className="text-xl text-[#fff]" />
                                </div>
                            </div>
                            {/* body */}
                            <div className='w-full'>
                                <form className='space-y-5' onSubmit={handleSubmitUser}>
                                    <div>
                                        <label className="text-sm font-normal text-gray-700 w-3/12 flex items-center">First Name*</label>
                                        <input
                                            type="text"
                                            name='firstName'
                                            placeholder="Enter First Name"
                                            required
                                            value={form.firstName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-normal text-gray-700 w-3/12 flex items-center">Last Name*</label>
                                        <input
                                            type="text"
                                            name='lastName'
                                            placeholder="Enter Last Name"
                                            required
                                            value={form.lastName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-normal text-gray-700 w-3/12 flex items-center">Email*</label>
                                        <input
                                            type="email"
                                            name='email'
                                            placeholder="Enter Email"
                                            required
                                            value={form.email}
                                            onChange={handleChange}
                                            autoComplete='new-email'
                                            className="w-full px-4 py-4 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </div>
                                        {
                                            !state.isUpdate &&
                                            <div>
                                                <label className="text-sm font-normal text-gray-700 w-3/12 flex items-center">Password*</label>
                                                <div className='relative flex items-center justify-end'>
                                                    <input
                                                        type={state.showPassword ? 'text' : 'password'}
                                                        name='password'
                                                        placeholder="Set Password"
                                                        required
                                                        value={form.password}
                                                        onChange={handleChange}
                                                        autoComplete='new-password'
                                                        className="w-full p-4 pr-10 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                    {
                                                        state.showPassword ? (
                                                            <IoIosEye className="absolute right-3 text-[#A8A8A8] text-2xl cursor-pointer" onClick={() => setState((old) => ({ ...old, showPassword: false }))} />
                                                        ) : (
                                                            <IoMdEyeOff className="absolute right-3 text-[#A8A8A8] text-2xl cursor-pointer" onClick={() => setState((old) => ({ ...old, showPassword: true }))} />)
                                                    }
                                                </div>
                                            </div>
                                        }
                                    <div className='flex items-center justify-end gap-2'>
                                        <button className='bg-[#FE665C] rounded-full text-[#fff] hover:bg-red-400 py-4 px-10' onClick={() => setState((old) => ({ ...old, isModalOpen: false }))}>Cancel</button>
                                        <button className='bg-[#223575] rounded-full text-[#fff] hover:bg-blue-900 py-4 px-10'>{state.isUpdate ? 'Update' : 'Create'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {/* DELETE USER CONFIRMATION MODAL */}
            {
                state.isDeleteModalOpen &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-70 blur-l"></div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all min-h-[400px] w-full lg:w-[500px] ">
                        <div className="w-full min-h-[400px] flex flex-col justify-center items-center relative">
                            {/* <Image width={85} height={85} src={logoutPop} /> */}
                            <div className='w-20 h-20 flex items-center justify-center rounded-full bg-colorTertiary text-colorThemeSecondary'>
                                <Icon icon="fluent:delete-20-filled" className='text-4xl' />
                            </div>
                            <h2 className="text-xl font-medium text-left text-[#999999] mt-10">Are You Sure You Want To Delete <span className='text-colorTertiary'>{state?.selectedUser?.firstName} {state?.selectedUser?.lastName}</span>?</h2>
                            <div className='mt-10 space-x-5 flex'>
                                <button className='w-[168px] h-[54px] bg-[#223575] rounded-full text-[#fff] hover:bg-blue-900' onClick={handleDeleteSubmit}>Yes</button>
                                <button className='w-[168px] h-[54px] bg-[#FE665C] rounded-full text-[#fff] hover:bg-red-400' onClick={() => setState((old) => ({ ...old, isDeleteModalOpen: false }))}>No</button>
                            </div>
                            <div className="absolute top-[20px] right-[20px] bg-[#FE665C] w-[56px] h-[56px] flex justify-center items-center rounded-full cursor-pointer" onClick={() => setState((old) => ({ ...old, isDeleteModalOpen: false }))}>
                                <FaTimes className="text-xl text-[#fff]" />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default starsUsers;

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