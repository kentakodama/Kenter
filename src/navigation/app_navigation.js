import { StackNavigator} from 'react-navigation';

import Login from '../authentication/login';
import Splash from '../authentication/splash';
import CompleteProfile from '../components/complete_profile';
import SwipePage from '../components/deck/swipe_page';
import Main from '../components/main'

const AppNavigator = StackNavigator(

  {
    Index: {
      screen: Main
    },
    Login: {
      screen: Login
    },
    CompleteProfile: {
      screen: CompleteProfile
    },
    SwipePage: {
      screen: SwipePage
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
