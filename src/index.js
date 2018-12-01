import './index.scss';

import navbar from './components/navbar/navbar';
import authHelpers from './components/Helpers/authHelpers';

const initialize = () => {
  navbar.navBuilder();
  authHelpers.checkLoginStatus();
};

initialize();
