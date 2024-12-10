import ForgotPassTwo from '@/components/auth/ForgotPassTwo';

export default function ForgotPassOnePage() {
  return <ForgotPassTwo />;
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
