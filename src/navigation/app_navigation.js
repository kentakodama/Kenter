import { StackNavigator} from 'react-navigation';

import Login from '../authentication/login';
import Splash from '../authentication/splash';
import Main from '../components/main';

const AppNavigator = StackNavigator(

  {
    Index: {
      screen: Splash
    },
    Login: {
      screen: Login
    },
    Main: {
      screen: Main
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
  }
);

export default AppNavigator;
