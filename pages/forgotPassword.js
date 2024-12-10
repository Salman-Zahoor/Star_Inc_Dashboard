import ForgotPassThree from '@/components/auth/ForgotPassThree';

export default function ForgotPassThreePage() {
  return <ForgotPassThree />;
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
