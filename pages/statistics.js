import dynamic from 'next/dynamic';
import React from 'react';

const SplineAreaChart = dynamic(() => import('../components/StatisticsChart.js'), {
  ssr: false
});

const Statistics = () => {
  return (
    <div className='w-full py-20 px-10'>
        <div className='box-shadow rounded-lg p-10'>
            <SplineAreaChart />
        </div>
    </div>
  );
};

export default Statistics;

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
