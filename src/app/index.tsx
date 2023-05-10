import { ToastContainer } from 'react-toastify';

import Routing from 'pages';
import { AUTO_CLOSE_TOAST } from 'shared/consts';

import { withProviders } from './providers';
import './index.css';

const App = () => (
  <>
    <Routing />
    <ToastContainer autoClose={AUTO_CLOSE_TOAST} />
  </>
);

export default withProviders(App);
