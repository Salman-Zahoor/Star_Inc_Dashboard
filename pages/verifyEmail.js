import ForgotPassOne from '@/components/auth/ForgotPassOne';

export default function ForgotPassOnePage() {
  return <ForgotPassOne />;
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
