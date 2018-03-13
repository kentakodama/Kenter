import { StackNavigator} from 'react-navigation';

import Login from '../authentication/login';
import Splash from '../authentication/splash';
import CompleteProfile from '../components/complete_profile';
import SwipePage from '../components/deck/swipe_page';
import Main from '../components/main'
import EditAbout from '../components/profile/edit_about'
import AboutMe from '../components/profile/about_me'

const AppNavigator = StackNavigator(

  {
    Index: {
      screen: Splash
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
    },
    EditAbout: {
      screen: EditAbout
    },
    AboutMe: {
      screen: AboutMe
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
  }
);

export default AppNavigator;
