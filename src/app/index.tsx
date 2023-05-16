import { ToastContainer } from 'react-toastify';

import Routing from 'pages';
import { Footer, Header } from 'widgets';
import { AUTO_CLOSE_TOAST } from 'shared/consts';

import { withProviders } from './providers';
import './index.css';

const App = () => (
  <>
    <Header />
    <Routing />
    <Footer />
    <ToastContainer autoClose={AUTO_CLOSE_TOAST} />
  </>
);

export default withProviders(App);
