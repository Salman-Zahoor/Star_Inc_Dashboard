import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReferrals } from '@/redux/slices/client-referrals';

const ClientReferral = ({ token }) => {
    const dispatch = useDispatch();

    const { referrals, loading } = useSelector(state => state.refferal);
    // console.log(users, '<0000')

    useEffect(() => {
        console.log('called')
        dispatch(getAllReferrals());
    }, [dispatch]);

    return (
        <>
            <div className='w-full py-20 px-10 space-y-10'>
                <TableContainer component={Paper} className='p-10 muiTable'>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='text-base font-extrabold text-center'>id</TableCell>
                                <TableCell className='text-base font-extrabold text-center'>Name</TableCell>
                                <TableCell className='text-base font-extrabold text-center'>Phone Number</TableCell>
                                <TableCell className='text-base font-extrabold text-center'>Email Address</TableCell>
                                <TableCell className='text-base font-extrabold text-center'>Address</TableCell>
                                <TableCell className='text-base font-extrabold text-center'>Reason For Referral</TableCell>
                                <TableCell className='text-base font-extrabold text-center'>Preferred Contact Method</TableCell>
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
                                            referrals && referrals.length > 0 && referrals.map((referral, index) => (
                                                <TableRow key={referral.id}>
                                                    <TableCell component="th" scope="row" className='text-base font-normal capitalize'>
                                                        {referral.id}
                                                    </TableCell>
                                                    <TableCell className='text-base font-normal capitalize'>{referral.name}</TableCell>
                                                    <TableCell className='text-base font-normal'>{referral.phone}</TableCell>
                                                    <TableCell className='text-base font-normal'>{referral.email ? referral.email : '---'}</TableCell>
                                                    <TableCell className='text-base font-normal capitalize'>{referral.address ? referral.address : '---'}</TableCell>
                                                    <TableCell className={`text-base font-normal`}>{referral.reasonForReferral}</TableCell>
                                                    <TableCell className={`text-base font-normal`}>{referral.preferredContactMethod
                                                    }</TableCell>
                                                </TableRow>
                                            ))
                                        }

                                        {
                                            referrals.length < 1 &&
                                            <TableRow>
                                                <TableCell colSpan={7} className='text-center'>
                                                    No referrals found!
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

        </>
    );
}

export default ClientReferral;

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