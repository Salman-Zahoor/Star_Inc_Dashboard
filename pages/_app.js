import Layout from "@/components/Layout";
import { Poppins } from 'next/font/google';
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from '../redux/store';
import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <main className={poppins.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
      <ToastContainer />
    </Provider>
  );
}
