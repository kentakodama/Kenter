import { StackNavigator} from 'react-navigation';

import Login from '../authentication/login';
import Splash from '../authentication/splash';

const AppNavigator = StackNavigator(

  {
    Index: {
      screen: Splash
    },
    Login: {
      screen: Login
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
  }
);

export default AppNavigator;
